import debounce from "lodash.debounce";
import { useMemo, useEffect, useState } from "react";
import { useInfiniteQuery  } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { api } from "../api";
import type { Entry } from "../types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import { Modal } from "./Modal";
import { EntryForm } from "./EntryForm";

type EntryTableProps = {
  onRef?: (refetch: () => void) => void;
};

export function EntryTable({ onRef }: EntryTableProps) {
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [entryToDelete, setEntryToDelete] = useState<Entry | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["entries", { search, filterType }],
    queryFn: ({ pageParam = 1 }) =>
      api
        .get("/entries", {
          params: {
            page: pageParam,
            search,
            type: filterType,
          },
        })
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (onRef) {
      onRef(refetch)
    };
  }, [onRef, refetch]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const entries = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by title..."
          value={tempSearch}
          onChange={(e) => {
            setTempSearch(e.target.value);
            debouncedSetSearch(e.target.value);
          }}
          className="w-64"
        />

        <Select
          value={filterType ?? "All"}
          onValueChange={(val) => {
            setFilterType(val === "All" ? undefined : val);
          }}
        >
          <SelectTrigger className="
              min-w-52
              !border 
              !border-gray-200
              !px-3
              focus-visible:!border-ring focus-visible:!ring-ring/50 focus-visible:!ring-[3px]
              !text-sm !font-normal
            ">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Movie">Movie</SelectItem>
            <SelectItem value="TV Show">TV Show</SelectItem>
          </SelectContent>
        </Select>
      </div>
    
      <div className="overflow-auto max-h-[571px]">
        <Table className="table-fixed border">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Director</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Year / Time</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : entries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No entries found.
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry: Entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.director}</TableCell>
                  <TableCell>{entry.budget}</TableCell>
                  <TableCell>{entry.location}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                  <TableCell>{entry.yearTime}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button onClick={() => {
                      setSelectedEntry(entry);
                      setIsEditOpen(true);
                    }}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setEntryToDelete(entry);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {hasNextPage && <div ref={ref} className="h-10" />}

        {isFetchingNextPage && (
          <p className="text-center mt-4">Loading more...</p>
        )}

        {selectedEntry && (
          <Modal
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            title="Edit Entry"
            description="Fill in the details for your favorite movie or TV show."
          >
            <EntryForm
              entry={selectedEntry}
              onSuccess={() => {
                setIsEditOpen(false);
                refetch();
              }}
            />
          </Modal>
        )}

        <Modal
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          title="Confirm Delete"
          description={`Are you sure you want to delete "${entryToDelete?.title}"?`}
        >
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!entryToDelete) return;
                try {
                  await api.delete(`/entries/${entryToDelete.id}`);
                  setIsDeleteOpen(false);
                  setEntryToDelete(null);
                  refetch();
                } catch (error) {
                  console.error("Delete failed", error);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </>
  )
}
