import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import React from 'react';
import { Fonts } from '@/constants/Font';
import AvatarImage from '../Avatar/AvatarImage';

type Props = React.ComponentPropsWithRef<typeof View> & {
    width?: number
    height?: number
    color?: string
    title?: string
    description?: string
}

const Card = ({ width, height, color, title, description }: Props) => {
    return (
        <View style={[
            {
                width: width,
                height: height,
                backgroundColor: color
            }, 
            styles.card]}>
            <View style={styles.cardBody}>
                <AvatarImage source={0}></AvatarImage>
                <Text style={styles.cardTitle}>
                    { title }
                </Text>
                <Text style={styles.cardDescription}>
                    { description }
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 1,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: '5%',
        marginTop: 20,
        flexDirection: 'row',
        maxWidth: '90%'
    },
    cardBody: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    cardTitle: {
        ...Fonts.default.headlineMedium
    },
    cardDescription: {
        ...Fonts.default.bodySmall,
        marginTop: 10
    }
});

export default Card