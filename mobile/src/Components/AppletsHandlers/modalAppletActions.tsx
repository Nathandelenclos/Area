import { TouchableOpacity, View } from "react-native";

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <Pressable
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: !isdarkmode ? '#00000075' : '#FFFFFF75',
    }}
    onPress={() => setModalVisible(!modalVisible)}
    >
  </Pressable>
  <View
    style={{
      width: '100%',
      height: '40.5%',
      top: '-40.5%',
      backgroundColor: color.mode,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {settingsList.map((applet, i) => (
      <View
        key= {i}
        style={{
          flexDirection: 'row',
          borderBottomColor: !applet.end ? '#6F6F6F' : '',
          borderBottomWidth: !applet.end ? 1 : 0,
          width: '88%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          key= {i}
          onPress= {
            () => {
              applet.handleOnPress
              applet.isActive = !applet.isActive
              setSettingsList(settingsList)
            }
          }
          style={{
            marginLeft: '6%',
            marginRight: '6%',
            marginTop: '4%',
            marginBottom: '4%',
          }}
        >
          <Text 
            key= {i}
            style={{
              color: !applet.end ? '#6F6F6F' : '#FF000075',
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            {applet.isActive && applet.settingTitle[1] ? applet.settingTitle[1] : applet.settingTitle[0]}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            left: '0%',
          }}
        >
          <FontAwesomeIcon
            key= {i}
            icon={applet.isActive && applet.iconName[1] ? applet.iconName[1] : applet.iconName[0]}
            size={35}
            style={{ 
              color: applet.end ? '#FF000075' : applet.fav && applet.isActive ? '#FF0000' : '#6F6F6F',
            }}
          />
        </View>
      </View>
      ))
    }
  </View>
</Modal>
<Pressable
  onPress={() => setModalVisible(true)}>
  <FontAwesomeIcon
    icon={'ellipsis-v'}
    size={50}
    style={{ 
      color: "white",
    }}
  />
</Pressable>