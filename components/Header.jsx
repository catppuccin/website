import {
    Box,
    Button,
    Text,
    Image,
    Avatar,
    Heading
} from '@chakra-ui/react'

export default function Header() {
    return (
        <Box
            p={'4'}
            pb={'0'}
            display={'flex'}
            height='10%'
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >   
            <Avatar src='https://raw.githubusercontent.com/catppuccin/catppuccin/dev/assets/logos/exports/1544x1544_circle.png' size='50px' width={['100px', '100px', '100px', '150px']} height={['100px', '100px', '100px', '150px']}/>
            <Heading fontFamily={'Fredoka One, cursive'} fontSize={['2rem', '2rem', '3rem', '4rem']} fontWeight={'100'}>catppuccin</Heading>
            <Heading fontFamily={'Fredoka One, cursive'} fontSize={['1rem', '1rem', '1rem', '1.5rem']} fontWeight={'100'}>A soothing pastel theme for the high spirited!</Heading>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mb={'1.5'}>
                <Text mr={'2.5'}><a href="https://github.com/catppuccin/catppuccin#-palette" target={'blank'}>Palette </a></Text>
                <Text mr={'2.5'}><a href="https://github.com/catppuccin/catppuccin#-ports-and-more" target={'blank'}>Ports </a></Text>
                <Text><a href="https://github.com/catppuccin/catppuccin#-design-philosophy" target={'blank'}>Design Philosophy</a></Text>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mb={'1.5'}>
                <Image src="https://raw.githubusercontent.com/catppuccin/catppuccin/dev/assets/palette/morning.png" width={['185px', '185px', '185px', '285px']} alt='img'/>
                <Image src="https://raw.githubusercontent.com/catppuccin/catppuccin/dev/assets/palette/night.png" width={['185px', '185px', '185px', '285px']} alt='img'/>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <a href="https://github.com/catppuccin/catppuccin/stargazers" target={'blank'}>
                    <Image alt="Stargazers" src="https://img.shields.io/github/stars/catppuccin/catppuccin?style=for-the-badge&logo=starship&color=C9CBFF&logoColor=D9E0EE&labelColor=302D41"/></a>
                <a href="https://github.com/catppuccin/catppuccin/releases/latest" target={'blank'}>
                    <Image alt="Releases" src="https://img.shields.io/github/release/catppuccin/catppuccin.svg?style=for-the-badge&logo=github&color=F2CDCD&logoColor=D9E0EE&labelColor=302D41"/></a>
                <a href="https://github.com/catppuccin/catppuccin/issues" target={'blank'}>
                    <Image alt="Issues" src="https://img.shields.io/github/issues/catppuccin/catppuccin?style=for-the-badge&logo=gitbook&color=B5E8E0&logoColor=D9E0EE&labelColor=302D41"/></a>
                <a href="https://discord.gg/r6Mdz5dpFc" target={'blank'}>
                    <Image alt="Discord" src="https://img.shields.io/discord/907385605422448742?style=for-the-badge&logo=discord&color=DDB6F2&logoColor=D9E0EE&labelColor=302D41"/></a>
            </Box>
        </Box>
    )
}