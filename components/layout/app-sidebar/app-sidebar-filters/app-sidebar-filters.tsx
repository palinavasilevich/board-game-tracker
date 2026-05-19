"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { FilterIcon } from "lucide-react";

const formSchema = z.object({
  genres: z.array(z.string()),
  playerCount: z.number().int().positive().min(1).optional(),
  playTime: z.number().int().positive().optional(),
  sortBy: z.enum(["name", "rank", "newest"]).optional(),
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
      playerCount: searchParams.get("playerCount")
        ? Number(searchParams.get("playerCount"))
        : 2,
      playTime: searchParams.get("playTime")
        ? Number(searchParams.get("playTime"))
        : 60,
      sortBy: (searchParams.get("sortBy") as FormValues["sortBy"]) ?? undefined,
    },
  });

  function onSubmit(data: FormValues) {
    const params = new URLSearchParams();

    if (data.genres.length) params.set("genres", data.genres.join(","));

    if (data.playerCount != null)
      params.set("playerCount", String(data.playerCount));

    if (data.playTime != null) params.set("playTime", String(data.playTime));

    if (data.sortBy) params.set("sortBy", data.sortBy);
    router.replace(`/?${params.toString()}`);
  }

  function handleReset() {
    form.reset({
      genres: [],
      playerCount: 2,
      playTime: 60,
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
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rank">Ranking</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Controller
          name="playerCount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div>
                <FieldLabel htmlFor="filter-player-count">
                  Player Count
                </FieldLabel>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {field.value}
                </span>
              </div>

              <Slider
                id="filter-player-count"
                defaultValue={[2]}
                min={1}
                max={10}
                step={1}
                value={field.value != null ? [field.value] : undefined}
                onValueChange={(values) => field.onChange(values[0])}
                onBlur={field.onBlur}
              />
            </Field>
          )}
        />

        <Controller
          name="playTime"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div>
                <FieldLabel htmlFor="filter-play-time">Play Time</FieldLabel>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {field.value}
                </span>
              </div>

              <Slider
                id="filter-play-time"
                defaultValue={[60]}
                min={5}
                max={240}
                step={5}
                value={field.value != null ? [field.value] : undefined}
                onValueChange={(values) => field.onChange(values[0])}
                onBlur={field.onBlur}
              />
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={handleReset}>
          Clear Filters
        </Button>
        <Button type="submit">
          <FilterIcon />
          Apply filter
        </Button>
      </div>
    </form>
  );
}
