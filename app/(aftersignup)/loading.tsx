import { Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <section className="flex-center py-[15%]">
      <Spinner color="purple.500" size="xl" />
    </section>
  );
}
