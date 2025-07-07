import { useState, useEffect } from "react";
import { api } from "../api";
import type { Entry } from "../types";
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";

type EntryFormProps = {
  entry?: Partial<Entry>;
  onSuccess?: () => void;
};

export function EntryForm({ entry, onSuccess }: EntryFormProps) {
  const [form, setForm] = useState<Partial<Entry>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, string[]>>>({});

  useEffect(() => {
    setForm(entry || {});
  }, [entry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (form.id) {
        await api.put(`/entries/${form.id}`, form);
      } else {
        await api.post("/entries", form);
        setForm({});
      }

      if (onSuccess) onSuccess();

    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.fieldErrors) {
        setErrors(error.response.data.fieldErrors);
      } else {
        setMessage("Error saving entry.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <div>
        <Input id="title" name="title" placeholder="Title" value={form.title || ""} onChange={handleChange} />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title[0]}</p>
        )}
      </div>

      <div>
        <Select
          value={form.type || ""}
          onValueChange={(value) =>{
            setForm({ ...form, type: value });
            setErrors({ ...errors, type: undefined });
          }}
        >
          <SelectTrigger
            className="
              !border 
              !border-gray-200
              !px-3
              focus-visible:!border-ring focus-visible:!ring-ring/50 focus-visible:!ring-[3px]
              w-full
              !text-sm !font-normal
            "
          >
            <SelectValue placeholder="Select type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Movie">Movie</SelectItem>
            <SelectItem value="TV Show">TV Show</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-red-600 text-sm">{errors.type[0]}</p>
        )}
      </div>
      
      <div>
        <Input id="director" name="director" placeholder="Director" value={form.director || ""} onChange={handleChange} />
        {errors.director && (
          <p className="text-red-600 text-sm">{errors.director[0]}</p>
        )}
      </div>
      
      <div>
        <Input id="budget" name="budget" placeholder="Budget" value={form.budget || ""} onChange={handleChange} />
        {errors.budget && (
          <p className="text-red-600 text-sm">{errors.budget[0]}</p>
        )}
      </div>

      <div>
        <Input id="location" name="location" placeholder="Location" value={form.location || ""} onChange={handleChange} />
        {errors.location && (
          <p className="text-red-600 text-sm">{errors.location[0]}</p>
        )}
      </div>

      <div>
        <Input id="duration" name="duration" placeholder="Duration" value={form.duration || ""} onChange={handleChange} />
        {errors.duration && (
          <p className="text-red-600 text-sm">{errors.duration[0]}</p>
        )}
      </div>

      <div>
        <Input id="yearTime" name="yearTime" placeholder="Year/Time" value={form.yearTime || ""} onChange={handleChange} />
        {errors.yearTime && (
          <p className="text-red-600 text-sm">{errors.yearTime[0]}</p>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </Button>

      {message && (
        <pre className="text-sm text-red-600 mt-2 whitespace-pre-wrap">{message}</pre>
      )}
    </div>
  );
}
