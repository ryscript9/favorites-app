import { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { EntryTable } from "../components/EntryTable";
import { Modal } from "@/components/Modal";
import { EntryForm } from "@/components/EntryForm";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [refetchEntries, setRefetchEntries] = useState<() => void>(() => () => {});

  return (
    <Layout>
      <div className="text-right mb-4">
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Add New Entry"
          description="Fill in the details for your favorite movie or TV show."
          triggerText="Add Entry"
        >
          <EntryForm
            onSuccess={() => {
              setOpen(false);
              refetchEntries();
            }}
          ></EntryForm>
        </Modal>
      </div>
      <EntryTable onRef={(refetchFn) => {
        setRefetchEntries(() => refetchFn);
      }}
      />
    </Layout>
  );
}