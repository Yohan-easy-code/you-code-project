"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  LessonDetailSchema,
  LESSON_STATE,
  type LessonDetailValues,
} from "./lesson.schema";
import { updateLessonAction } from "../lesson.action";

type LessonDetailsFormProps = {
  lessonId: string;
  courseId: string;
  initialValues: LessonDetailValues;
};

export const LessonDetailsForm = ({
  lessonId,
  courseId,
  initialValues,
}: LessonDetailsFormProps) => {
  const router = useRouter();

  const form = useForm<LessonDetailValues>({
    resolver: zodResolver(LessonDetailSchema),
    defaultValues: initialValues,
  });

  React.useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  async function onSubmit(data: LessonDetailValues) {
    try {
      const result = await updateLessonAction({
        lessonId,
        data,
      });

      if (result?.serverError || result?.validationErrors) {
        toast.error(result.serverError ?? "Failed to update lesson");
        return;
      }

      toast.success(result?.data?.message ?? "Lesson updated successfully");

      router.push(`/admin/courses/${courseId}/lessons/${lessonId}`);
      router.refresh();
    } catch {
      toast.error("Failed to update lesson");
    }
  }

  return (
    <Card className="h-fit w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Edit lesson</CardTitle>
        <CardDescription>Update the lesson information.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="lesson-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lesson-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="lesson-name"
                    placeholder="Lesson name..."
                    aria-invalid={fieldState.invalid}
                  />
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
                  <FieldLabel htmlFor="lesson-state">State</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="lesson-state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>

                    <SelectContent>
                      {LESSON_STATE.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FieldDescription>Choose lesson visibility.</FieldDescription>

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
            onClick={() => form.reset(initialValues)}
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="lesson-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
