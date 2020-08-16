import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('screen')
const _width = Number(width / 3);

function TableHeader({ dataHeader }){
    //console.log(dataHeader)
    return(
        <View style={{ flex: 1, flexDirection: 'row' }}>
            {dataHeader.map((res, key) => 
                <Text key={res.name} style={[ res.styleContent, { height: 35 } ]}>{res.name}</Text>
            )}
        </View>
    )
}

export default function Table(props){
    const { header, book, styleContentBody } = props;

    const renderItem = ( {item} ) => {
        let value = Object.keys(item).map((key) => [item[key]]);
        console.log(value)
        return(
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {
                        value.map((res, key) => 
                            <Text 
                                key={key} 
                                style={ [
                                    {borderColor: '#CCC', 
                                    borderWidth: 1, 
                                    padding: 5, 
                                    width: _width}, 
                                    styleContentBody[key
                                ]] }>
                                {res}
                            </Text>
                        )
                    }
                </View>
            </ScrollView>
        )
    }
    //console.log(book)
    return (
        <React.Fragment>
            <TableHeader dataHeader={header}/>
            <FlatList
                style={{ marginTop: 35}}
                data={book}
                renderItem={renderItem}
                numColumns={1}
            />
        </React.Fragment>
    )
}