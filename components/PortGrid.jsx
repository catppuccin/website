import {Component, useState, useEffect} from "react";
import GetPorts from "../utils/GetPorts";
import { 
    SimpleGrid,
    Box,
} from '@chakra-ui/react'
import PortCard from "./PortCard";
import SearchBar from "./SearchBar";

export default class PortGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ports: [],
            unmodifiedports: []
        }
        console.log(this.state.ports)
        this.filterGrid = this.filterGrid.bind(this);
    }
    componentDidMount() {
        GetPorts().then(data => {
            this.setState({
                ports: data.filter(port => port.name !== 'catppuccin' && port.name !== '.github' && port.name !== 'discord-bot'),
                unmodifiedports: data.filter(port => port.name !== 'catppuccin' && port.name !== '.github' && port.name !== 'discord-bot'),
            })
        })
        
    }
    filterGrid(query) {
        var curr = this.state.unmodifiedports.filter((el) => {
            if (el.name.toLowerCase().includes(query.toLowerCase()) ) {
                return el
            }
        })
        this.setState({
            ports: curr
        })
    }
    render() {
        return (
            <Box 
                display={'flex'} 
                flexDirection={'column'} 
                p='2rem' 
                height={'80%'}
                minHeight={'80vh'}
            >
                <SearchBar 
                    ports={this.state.ports} 
                    filterGrid={this.filterGrid}
                />
                <SimpleGrid 
                    columns={[1, 1, 2, 3]} 
                    spacing={6}
                >
                    {this.state.ports.map(port => {
                        // if (port.name !== ".github" && port.name !== "catppuccin") {
                            return (
                                <PortCard port={port} key={port.name}/>
                            )
                        }
                    // }
                    )}
                </SimpleGrid>
            </Box>
        )
    }
}