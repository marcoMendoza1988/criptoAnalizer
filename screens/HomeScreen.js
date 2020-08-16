import React from 'react';
import { ScrollView, Dimensions, Button, Text, View, TouchableWithoutFeedback } from 'react-native';

import Table from '../components/table';

import {
    ProgressChart,
} from "react-native-chart-kit";

const { width } = Dimensions.get('screen')

class HomeScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            book:null,
            availables_books: null
        }
    }
    
    componentDidMount(){ 
        this.fetch_available_books();
        this.fetchBooks('btc_mxn');   
    }

    fetchBooks(book){
        console.log(book)
        fetch(`https://api.bitso.com/v3/order_book/?book=${book}`)
        .then(res => res.json())
        .then(res => this.setState({book: res.payload}))
        .catch((error) => console.log(error))
    }

    fetch_available_books(){
        fetch('https://api.bitso.com/v3/available_books/')
        .then(res => res.json())
        .then(res => this.setState({availables_books: res.payload}))
        .catch((error) => console.log(error))
    }

    render(){
        let { book, availables_books } = this.state;
        const _width = Number(width / 3);
        let data = {};
        data.data = [];
        data.lebels = [];
        
        if(availables_books){
            for(let i = 0; i < availables_books.length; i++){
                //data.lebels.push(availables_books[i].book)
                //data.data.push(0.5)
                //console.log(availables_books[i].book)
            }
        }
        
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
        };

        return(
            <React.Fragment>
                <ScrollView horizontal={true}>
                    {availables_books &&
                    availables_books.map((res, key) => {
                        let { book } = res;

                        return <TouchableWithoutFeedback onPress={(ev) => this.fetchBooks(book)}>
                                    <View style={{
                                        borderRadius: 10, 
                                        backgroundColor: '#f96332', 
                                        width: width - 10, 
                                        margin: 5, 
                                        padding: 10
                                    }}>
                                        <Text>{book}</Text>
                                        <Text>{book}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                    })}
                </ScrollView>
                
                    {book && 
                        <Table 
                            book={book.asks} 
                            styleContentBody={[
                                { textAlign: 'center' },
                                { textAlign: 'center', backgroundColor: 'green', color: '#FFF' }, 
                                { textAlign: 'center', backgroundColor: 'blue', color: '#FFF' }
                            ]} 
                            header={[
                                {name:'book', styleContent:{ color: '#FFF', borderColor: '#CCC', borderWidth: 1, padding: 2, width: _width, textAlign:'center', backgroundColor: 'grey'}}, 
                                {name:'amount', styleContent:{ color: '#FFF', borderColor: '#CCC', borderWidth: 1, padding: 2, width: _width, textAlign:'center', backgroundColor: 'grey'}}, 
                                {name:'price', styleContent:{ color: '#FFF', borderColor: '#CCC', borderWidth: 1, padding: 2, width: _width, textAlign:'center', backgroundColor: 'grey'}}
                            ]} 
                        />
                    }
            </React.Fragment>
        )
    }

}

export default HomeScreen;