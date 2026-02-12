import { IPGallery } from "@/components/organisms/IPGallery";

export const metadata = {
  title: "Labs | Compassionate Design",
  description:
    "Explore our portfolio of 12 intellectual properties — SDK products and investment opportunities built with compassionate design principles.",
};

export default function LabsPage() {
  return (
    <main className="pt-24">
      <IPGallery />
    </main>
  );
}
