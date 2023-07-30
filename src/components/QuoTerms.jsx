import { Text, View, StyleSheet } from '@react-pdf/renderer'
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,

  },
  left: {
    width: '25%'
  },
  center: {
    width: '5%'
  },
  right: {
    width: '75%'
  }
})
export default function QuoTerms() {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'extrabold', fontSize: 10 }}>TÉRMINOS Y CONDICIONES</Text>
      <View style={styles.row}>
        <Text style={styles.left}>TIEMPO DE ENTREGA</Text>
        <Text style={styles.center}>:</Text>
        <Text style={styles.right}>5 día(s) útil, una vez recepcionada la Orden de Compra y/o aprobación de artes</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.left}>FORMA DE PAGO</Text>
        <Text style={styles.center}>:</Text>
        <Text style={styles.right}>50% adelanto , 50% contraentrega</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.left}>VALIDEZ</Text>
        <Text style={styles.center}>:</Text>
        <Text style={styles.right}>15 días</Text>
      </View>
    </View>

  )
}
