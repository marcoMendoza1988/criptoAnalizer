import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen')
const _width = Number(width / 3) - 5;

function TableHeader({dataHeader}){
    //console.log(dataHeader)
    return(
        <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
            {dataHeader.map((res, key) => 
                <Text key={res.name} style={[res.styleContent]}>{res.name}</Text>
            )}
        </View>
    )
}

export default function Table(props){
    const { header, book, styleContentBody } = props;

    const renderItem = ( {item} ) => {
        //console.log(styleContentBody)
        return(
            <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                <Text style={ [{borderColor: '#CCC', borderWidth: 1, padding: 5, width: _width}, styleContentBody[0]]}>{item.book}</Text>
                <Text style={[{borderColor: '#CCC', borderWidth: 1, padding: 5, width: _width}, styleContentBody[1]]}>{item.amount}</Text>
                <Text style={[{borderColor: '#CCC', borderWidth: 1, padding: 5, width: _width}, styleContentBody[2]]}>{item.price}</Text>
            </View>
        )
    }
    //console.log(book)
    return (
        <React.Fragment>
            <TableHeader dataHeader={header}/>
            <FlatList
                data={book}
                renderItem={renderItem}
                numColumns={1}
            />
        </React.Fragment>
    )
}