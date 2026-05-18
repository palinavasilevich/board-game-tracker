"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const formSchema = z.object({
  genres: z.array(z.string()),
  minMetaScore: z.number().min(0).max(10).optional(),
  sortBy: z.enum(["name", "metaScore", "newest"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AppSidebarFiltersProps {
  genres: { id: string; name: string }[];
}

export function AppSidebarFilters({ genres }: AppSidebarFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genres: searchParams.get("genres")?.split(",").filter(Boolean) ?? [],
      minMetaScore: searchParams.get("minMetaScore")
        ? Number(searchParams.get("minMetaScore"))
        : undefined,
      sortBy: (searchParams.get("sortBy") as FormValues["sortBy"]) ?? undefined,
    },
  });

  function onSubmit(data: FormValues) {
    const params = new URLSearchParams();
    if (data.genres.length) params.set("genres", data.genres.join(","));
    if (data.minMetaScore != null)
      params.set("minMetaScore", String(data.minMetaScore));
    if (data.sortBy) params.set("sortBy", data.sortBy);
    router.replace(`/?${params.toString()}`);
  }

  function handleReset() {
    form.reset({
      genres: [],
      minMetaScore: undefined,
      sortBy: undefined,
    });
    router.replace("/");
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Genre</FieldLabel>
          <Controller
            name="genres"
            control={form.control}
            render={({ field }) => (
              <ToggleGroup
                type="multiple"
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-wrap justify-start gap-1"
                spacing={2}
              >
                {genres.map((genre) => (
                  <ToggleGroupItem
                    key={genre.id}
                    value={genre.name}
                    size="sm"
                    variant="outline"
                  >
                    {genre.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          />
        </Field>

        <Field>
          <FieldLabel>Sort by</FieldLabel>
          <Controller
            name="sortBy"
            control={form.control}
            render={({ field }) => (
              <Select
                name={field.name}
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="metaScore">Meta Score</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Controller
          name="minMetaScore"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="filter-min-meta-score">
                Min Meta Score
              </FieldLabel>
              <Input
                id="filter-min-meta-score"
                type="number"
                min={0}
                max={10}
                step={0.1}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : Number(e.target.value),
                  )
                }
                onBlur={field.onBlur}
                name={field.name}
              />
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button type="submit">Apply filter</Button>
      </div>
    </form>
  );
}
