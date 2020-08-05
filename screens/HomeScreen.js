import React from 'react';
import { ScrollView, Dimensions } from 'react-native';

import Table from '../components/table';

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
        this.fetchBooks();    
        this.fetch_available_books();
    }

    fetchBooks(){
        fetch('https://api.bitso.com/v3/order_book/?book=btc_mxn')
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
        const _width = Number(width / 3) - 5;

        console.log(availables_books)
        return(
            <ScrollView style={{ marginHorizontal: 5 }}>
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
            </ScrollView>
        )
    }

}

export default HomeScreen;