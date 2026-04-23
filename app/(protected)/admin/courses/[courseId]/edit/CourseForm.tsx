"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { courseFormSchema, type CourseFormValues } from "./course.schema";
import { createCourseAction, updateCourseAction } from "./course.action";

type CourseFormProps = {
  initialValues?: CourseFormValues;
  courseId?: string;
};

const placeholderImageUrl = "/placeholder-course.svg";

const emptyValues: CourseFormValues = {
  title: "",
  imageUrl: placeholderImageUrl,
  presentation: "",
  state: "DRAFT",
};

export function CourseForm({ initialValues, courseId }: CourseFormProps) {
  const router = useRouter();

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: initialValues ?? emptyValues,
  });

  React.useEffect(() => {
    form.reset(initialValues ?? emptyValues);
  }, [initialValues, form]);

  async function onSubmit(data: CourseFormValues) {
    try {
      const result = courseId
        ? await updateCourseAction({
            courseId,
            ...data,
          })
        : await createCourseAction(data);

      const message =
        result?.data?.message ??
        (courseId
          ? "Course updated successfully"
          : "Course created successfully");

      const nextCourseId = result?.data?.course?.id ?? courseId;

      toast.success(message);

      if (nextCourseId) {
        router.push(`/admin/courses/${nextCourseId}`);
        router.refresh();
      }
    } catch {
      toast.error(
        courseId ? "Failed to update course" : "Failed to create course",
      );
    }
  }

  return (
    <Card className="w-full">
      <CardContent>
        <form id="course-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="imageUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="course-image">Image URL</FieldLabel>
                  <div className="space-y-3">
                    <Input
                      {...field}
                      id="course-image"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://..."
                      autoComplete="off"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant={
                          field.value === placeholderImageUrl
                            ? "default"
                            : "outline"
                        }
                        onClick={() => field.onChange(placeholderImageUrl)}
                      >
                        Use placeholder image
                      </Button>
                    </div>
                  </div>
                  <FieldDescription>
                    Use an external image URL or select the default placeholder.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="course-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="course-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="BeginJavaScript"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="presentation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="course-presentation">
                    Presentation
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="course-presentation"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                      placeholder="Write the course presentation..."
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length} chars
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>Markdown is supported.</FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="course-state">State</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="course-state"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select course state" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="DRAFT">DRAFT</SelectItem>
                      <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset(initialValues ?? emptyValues)}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="course-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? courseId
                ? "Updating..."
                : "Creating..."
              : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
