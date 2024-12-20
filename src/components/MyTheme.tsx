import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes"

export const MyTheme: React.FC = ()=>{
    return <>
            <Box maxWidth="350px">
  <Card asChild>
    <a href="#">
      <Text as="div" size="2" weight="bold">
        Quick start
      </Text>
      <Text as="div" color="gray" size="2">
        Start building your next project in minutes
      </Text>
    </a>
  </Card>
</Box>
        </>
}