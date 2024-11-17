import { SimpleGrid } from "@chakra-ui/react";
import { InformationBox, InformationBoxProps } from "@/app/ui/information-box";

interface InformationGridProps {
  charList: Array<InformationBoxProps>;
}

export const InformationGrid = (props: InformationGridProps) => {
  const { charList } = props;
  const informationBox = charList.map((properties) => (
    <InformationBox key={properties.id} {...properties} />
  ));
  return (
    <SimpleGrid minChildWidth="300px" gap="15px">
      {informationBox}
    </SimpleGrid>
  );
};
