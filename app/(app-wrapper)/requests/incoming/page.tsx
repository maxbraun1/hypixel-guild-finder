import {
  getGuild,
  getRequests,
} from "@/app/(app-wrapper)/actions/account-actions";
import { redirect } from "next/navigation";
import IncomingRequest from "./components/request";
import UpdateRequestCount from "../update-request-count";

export default async function IncomingRequests() {
  const guild = await getGuild();

  if (!guild) {
    redirect("/guilds/add");
  }

  const requests = await getRequests();

  return (
    <>
      <UpdateRequestCount />
      <h1 className="text-3xl font-bold">Requests</h1>
      <p className="text-sm text-neutral-400 mb-5">
        These are requests from players that want to join your guild!
      </p>

      <div className="flex flex-col gap-3">
        {requests ? (
          requests.map((request, idx) => (
            <IncomingRequest key={`request-${idx}`} request={request} />
          ))
        ) : (
          <p>You don't have any requests yet!</p>
        )}
      </div>
    </>
  );
}
