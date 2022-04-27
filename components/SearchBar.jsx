/* eslint-disable react/no-children-prop */
import {Component, useState, useEffect} from "react";
import { AiOutlineSearch } from "react-icons/ai"
import {
    InputGroup,
    InputLeftElement,
    Input,
    Button,
    Flex,
    Text,
    Box,
    Icon,
    HStack,
    Heading
} from '@chakra-ui/react'

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ports: this.props.ports,
            query: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        event.preventDefault()
        if (event.key === 'Enter') {
            this.props.filterGrid(event.target.value)
        }
    }
    render() {
        return (
            <Flex
                display={'flex'}
                flexDirection={['column', 'column', 'column', 'row']}
                justifyContent={'center'}
                alignItems={'center'}
                mb={'6'}
            >
                <Box 
                    width={['100%', '100%', '100%', '25%']} 
                    display={'flex'} 
                    justifyContent={['center', 'center', 'center', 'left']} 
                    alignItems={'center'} 
                    mb={['1.5', '1.5', '1.5', '0']}
                > 
                    <Text 
                        textAlign={'left'}
                    >
                        Search among {this.props.ports.length} catppuccin ports 😺
                    </Text>
                 </Box>
                <InputGroup 
                    width={['100%', '100%', '100%', '75%']}
                >
                    <InputLeftElement 
                        children={<AiOutlineSearch />} 
                        color={'#C3BAC6'}
                    />
                    <Input
                        color={'#C3BAC6'}
                        placeholder="Search for a port..."
                        onChange={(e) => 
                            this.props.filterGrid(e.target.value)
                        }
                    />
                </InputGroup>
            </Flex>
        )
    }
}