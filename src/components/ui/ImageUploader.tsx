/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7mayXWyeEWv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"

export default function ImageUploader() {
  return (
    <div className="grid gap-4">
      <div>
        <h3 className="text-lg font-semibold">Upload Files</h3>
        <p className="text-gray-500 dark:text-gray-400">Drag and drop files or click to select.</p>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-12 transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600 focus-within:outline-2 focus-within:outline-dashed focus-within:outline-gray-500 dark:focus-within:outline-gray-400">
          <div className="text-center">
            <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
            <div className="mt-4 font-medium text-gray-900 dark:text-gray-50">Drop files to upload</div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">or click to select files</p>
            <input type="file" multiple className="sr-only" />
          </div>
        </div>
        <div className="grid gap-2">
          {[
            { name: "image.jpg", size: "2.3 MB" },
            { name: "document.pdf", size: "4.1 MB" },
            { name: "video.mp4", size: "12.6 MB" },
          ].map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/placeholder.svg"
                  alt={file.name}
                  width={40}
                  height={40}
                  className="rounded"
                  style={{ aspectRatio: "40/40", objectFit: "cover" }}
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-50">{file.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{file.size}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <XIcon className="h-5 w-5" />
                <span className="sr-only">Remove {file.name}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}