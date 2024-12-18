import ChatWrapper from "@/app/components/chat/ChatWrapper";
import PdfRenderer from "@/app/components/PdfRenderer";
import { getUserSubscriptionPlan } from "@/app/lib/stripe";

import { db } from "@/db";
import { notFound, redirect } from "next/navigation";
import { boolean } from "zod";

interface PageProps {
  params: {
    fileid: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { fileid } = params;

  const file = await db.file.findFirst({
    where: {
      id: fileid,
    },
  });
  if (!file) return notFound;
  //  const plan = await getUserSubscriptionPlan();
  const plan = {
    isSubscribed: false,
  };

  return (
    <div className="flex-1 justify-between flex flex-col h=[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8x1 grow lg:flex xl:px-2">
        {/* left side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={file.url} />
          </div>
        </div>
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper isSubscribed={plan.isSubscribed} fileId={file.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
