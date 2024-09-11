import { Text } from "@radix-ui/themes"
import { SiGooglecloud } from "react-icons/si";
import { SiGooglecloudstorage } from "react-icons/si";
export const Footer: React.FC = ()=>{
    return <footer style={{
        background:"black",
        padding:"1rem",
        textAlign:"center"
    }}>
        <Text color="orange" weight={"bold"}><SiGooglecloud fontSize={"2rem"}/>  <SiGooglecloudstorage fontSize={"2rem"}/> Inspired by Google Cloud </Text>
        </footer>
}
