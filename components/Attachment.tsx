import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    StyleProp,
    ViewStyle, 
    useWindowDimensions,
    useColorScheme,
    Alert,
  } from 'react-native'
import { Dispatch, SetStateAction } from 'react';
import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import VectorIcon from './VectorIcon'
import { ButtonSize } from '@/constants/Size'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
  
  type AttachmentType = {
    type: 'video' | 'audio' | 'image';
    uri: string;  // Path or URI to the attachment
    name?: string;  // Optional name for the attachment
  };

  type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     * Initials to show as the text in the `Avatar`.
     */
    backgroundColor?: string
    /**
     * Custom width for the button for the container.
     */
    width?: number
    /**
     * Custom height for the button for the container.
     */
    height?: number
    /**
     * Custom text for the button.
     */
    btnText?: string  
    /**
     * Style for the container
     */
    style?: StyleProp<ViewStyle>
    /**
     * Image/Video/Audio that will be used to post
     */
    attachment: AttachmentType | null

    setAttachment: Dispatch<SetStateAction<AttachmentType | null>>
  }
  
  /**
   * Used for attaching a image/video.
   *
   * ## Usage
   * ```
   * import * as React from 'react';
   * import * as Avatar from '@/components/Avatar'
   *
   * const MyComponent = () => (
   *   <Avatar.Text size={24} label="XD" />
   * );
   * ```
   */
  const Attachment = ({
    width = ButtonSize.defaultWidth,
    height = ButtonSize.defaultHeight,
    btnText,
    attachment,
    style,
    setAttachment,
  }: Props) => {
    const { ...restStyle } = StyleSheet.flatten(style) || {}
    const { fontScale } = useWindowDimensions()
    const colorScheme = useColorScheme;
      // Determine the gradient and underlay colors based on the theme
    const gradientColors = colorScheme === 'light'
    ? [Colors.buttonGradientLight.primary, Colors.buttonGradientLight.secondary]
    : [Colors.buttonGradientDark.primary, Colors.buttonGradientDark.secondary];

    const underlayColor = colorScheme === 'light'
      ? Colors.buttonGradientLight.underlay
      : Colors.buttonGradientDark.underlay;

    const iconColor = colorScheme === 'light'
      ? Colors.light.icon
      : Colors.dark.icon;

    const textColor = colorScheme === 'light'
      ? Colors.light.text
      : Colors.dark.text; 
      

      const selectAttachment = async (
        setAttachment: Dispatch<SetStateAction<AttachmentType | null>>
      ) => {
        // Ask the user what type of attachment they want to select
        Alert.alert(
          'Select Attachment',
          'Choose the type of attachment you want to add',
          [
            {
              text: 'Image or Video',
              onPress: async () => {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All, // Allows both images and videos
                  quality: 1,
                });
      
                if (!result.canceled) {
                  const { uri, type, fileName } = result;
                  setAttachment({
                    type: result.type === 'video' ? 'video' : 'image',
                    uri: uri!,
                    name: fileName || 'attachment',  // ImagePicker doesn't always provide a file name
                  });
                }
              },
            },
            {
              text: 'Audio',
              onPress: async () => {
                const result = await DocumentPicker.getDocumentAsync({
                  type: 'audio/*',
                });
      
                if (result.type !== 'cancel') {
                  setAttachment({
                    type: 'audio',
                    uri: result.uri,
                    name: result.name,
                  });
                }
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
      };

    return (
      <LinearGradient
        colors={gradientColors} // Gradient colors from orange to yellow
        start={{ x: 0, y: 0.5 }}  // Starting point (top-left)
        end={{ x: 0.5, y: 1 }}    // Ending point (bottom-right)
        locations={[0, 0.8]}    // Emphasize the primary color
        style={[{ borderRadius: 5,   }, restStyle]}
        >
        <TouchableHighlight
            style={{
                padding: 20,
                borderRadius: 5,
                width: width, height: height
            }}
             underlayColor= {underlayColor}
             onPress={() => selectAttachment(setAttachment)}>
            <View style={styles.buttonContainer}>
                <VectorIcon
                    name="upload"
                    type="MaterialIcons"
                    color={iconColor}
                    size={100}
                />
                <Text style={[styles.text, {
                  color: textColor,
                  fontSize: width / 4,
                },]}>{btnText}</Text>
            </View>
        </TouchableHighlight>
      </LinearGradient>
    )
  }
  
  
  const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',  // Aligns content vertically in the center
        alignItems: 'center',       // Aligns content horizontally in the center
    }
  })
  
  export default Attachment
  