import {
    Box,
    Heading,
    Text,
    Icon
} from '@chakra-ui/react'
import {FaStar, FaCodeBranch} from 'react-icons/fa'
import LazyLoad from 'react-lazyload';

export default function PortCard(props) {
    const bcolors= [
        '#F2CDCD',
        '#DDB6F2',
        '#F5C2E7',
        '#E8A2AF',
        '#F28FAD',
        '#F8BD96',
        '#FAE3B0',
        '#ABE9B3',
        '#B5E8E0',
        '#96CDFB',
        '#89DCEB',
    ]
    return (
        <LazyLoad>
            <Box 
                backgroundColor={'#302D41'} 
                key={props.port.id} 
                display={'flex'} 
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'left'}
                p={6}
                width={'100%'}
                height={'100%'}
                borderRadius={'lg'}
                onClick={() => window.open(props.port.url, '_blank')}
                cursor={'pointer'}
                borderColor={bcolors[Math.floor(Math.random()*bcolors.length)]}
                borderWidth={'3px'}
                borderStyle={'solid'}
                boxShadow={'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}
            >
                <Heading fontSize={'2xl'} mb={'1.5'} fontFamily={'Fredoka One, cursive'} fontWeight={'200'}>{props.port.name}</Heading>
                <Text fontSize={'sm'} mb={'1.5'} fontWeight={'100'}>{props.port.description}</Text>
                <Box display={'flex'} textAlign={'left'}>
                    <Box display={'flex'}>
                        <Icon as={FaStar} fontSize={'large'} color={'#C9CBFF'}/>
                        <Text fontSize={'sm'} mr={'1.5'} color={'#C9CBFF'}>{props.port.stars}</Text>
                    </Box>
                    <Box display={'flex'}>
                        <Icon as={FaCodeBranch} fontSize={'large'} color={'#C9CBFF'}/>
                        <Text fontSize={'sm'} color={'#C9CBFF'}>{props.port.forks}</Text>
                    </Box>
                </Box>
            </Box>
        </LazyLoad>
    )
}