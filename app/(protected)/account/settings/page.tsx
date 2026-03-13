import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
});

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-6">
      <div>
        <h1 className="text-3xl font-medium">Account settings</h1>
        <Separator />
      </div>
      <Card>
        <CardContent>
          <form
            action={async (formData) => {
              "use server";

              const userSession = await auth();
              if (!userSession?.user?.id) {
                redirect("/");
              }

              const image = formData.get("image");
              const name = formData.get("name");
              const safeData = FormSchema.safeParse({
                image,
                name,
              });

              if (!safeData.success) {
                const searchParams = new URLSearchParams();
                searchParams.set(
                  "error",
                  "Invalid data. Image must be an URL and name must be between 3 and 40 characters.",
                );
                redirect(`/account/settings?${searchParams.toString()}`);
              }
              await prisma.user.update({
                where: {
                  id: userSession.user.id,
                },
                data: safeData.data,
              });

              revalidatePath("/account");
              redirect("/account");
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <Label htmlFor="image">Image URL</Label>
              <Input
                defaultValue={session.user.image ?? ""}
                name="image"
                id="image"
              ></Input>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                defaultValue={session.user.name ?? ""}
                name="name"
                id="name"
              ></Input>
            </div>
            {searchParams.error && <p>Error: {searchParams.error as string}</p>}
            <Button>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
