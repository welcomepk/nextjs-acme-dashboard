import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { fetchLatestInvoices } from "@/app/lib/data";

// Type definition for the customer
interface Customer {
  _id: string; // UUID string for customer ID
  name: string; // Customer name
  email: string; // Customer email
  image_url: string; // URL to customer's image
}

// Type definition for the invoice
interface Invoice {
  _id: string; // MongoDB ObjectId for invoice
  customer_id: Customer; // Reference to the Customer object
  amount: number; // Amount in the invoice
  status: "paid" | "pending"; // Status of the invoice (enum)
  date: string; // ISO Date string
  createdAt: string; // ISO Date string for creation time
  updatedAt: string; // ISO Date string for last update time
  __v: number; // Version key (default in Mongoose)
}

export default async function LatestInvoices() {
  let latestInvoices: any;
  try {
    latestInvoices = await fetchLatestInvoices();
  } catch (error) {
    console.log(error);
  }
  if (!latestInvoices || latestInvoices.length === 0) {
    return (
      <div className="flex w-full flex-col md:col-span-4">
        No latest invoices
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {latestInvoices.map((invoice: Invoice, i) => {
            return (
              <div
                key={invoice._id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.customer_id.image_url}
                    alt={`${invoice.customer_id.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.customer_id.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.customer_id.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
