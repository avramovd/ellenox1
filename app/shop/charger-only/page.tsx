import { ChargerOnlyForm } from "@/components/ChargerOnlyForm"

export default function Page() {
  return (
    <div className="container max-w-xl py-10">
      <ChargerOnlyForm
        productName="EV Charger"
        price={495}
      />
    </div>
  )
}
