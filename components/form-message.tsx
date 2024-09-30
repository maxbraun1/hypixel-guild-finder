export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm mt-2">
      {"success" in message && (
        <div className="text-foreground border-l-4 border-purple-500 bg-neutral-800 p-2 px-4">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-destructive-foreground border-l-4 bg-neutral-800 p-2 border-red-500 px-4">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-4 border-white bg-neutral-800 p-2 px-4">
          {message.message}
        </div>
      )}
    </div>
  );
}
