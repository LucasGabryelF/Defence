import { memo } from "react";
import { Image, View, StyleSheet, ViewStyle, StyleProp } from "react-native";

type SpinnerProps = {
    style?: StyleProp<ViewStyle>
}

const Spinner: React.FC<SpinnerProps> = memo((props: SpinnerProps) => {
    return (
        <View style={{...props.style,...styles.container}}>
            <Image style={styles.spinnerIcon} source={require('@/assets/loading.gif')} />            
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        opacity: 0.7,
        zIndex: 100
    },
    spinnerIcon: {
        height: 60,
        width: 60
    }
})

export default Spinner;