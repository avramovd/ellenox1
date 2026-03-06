export default function Success() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
        
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          ✓
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl font-bold">Payment Successful</h1>

        {/* Message */}
        <p className="mt-3 text-muted-foreground">
          Thank you for your purchase! Your order has been received and is now being processed.
        </p>

        {/* Info */}
        <div className="mt-6 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
          ✔ Confirmation email has been sent<br/>
          ✔ Our team will contact you shortly<br/>
          ✔ Delivery details will be confirmed
        </div>

        {/* CTA */}
        <a
          href="/"
          className="mt-6 inline-block w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Back to Home
        </a>

      </div>
    </div>
  );
}
