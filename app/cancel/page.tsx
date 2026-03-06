export default function Cancel() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          ✕
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl font-bold">Payment Cancelled</h1>

        {/* Message */}
        <p className="mt-3 text-muted-foreground">
          Your payment was not completed. No charges were made.
        </p>

        {/* Help info */}
        <div className="mt-6 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
          ✔ You can try again anytime<br/>
          ✔ Your cart details are still saved<br/>
          ✔ Contact us if you need assistance
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <a
            href="/shop/charger-only"
            className="block w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Try Again
          </a>

          <a
            href="/"
            className="block text-sm text-muted-foreground underline hover:no-underline"
          >
            Return to Home
          </a>
        </div>

      </div>
    </div>
  )
}
