import { getIgv } from '../utils/numbers'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  content: {
    width: 200,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    gap: 10
  },
  total: {
    padding: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'black',
    color: 'white'
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  }
})
export default function QuoTotal({ items}) {
  const {total, subTotal, igv} = getIgv(items.map(item => item.rate))
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.textWrap}>
            <Text style={styles.tableCell}>Descuentos</Text>
            <Text style={{ textAlign: 'right' }}>S/</Text>
          </View>
          <Text style={styles.tableCell}>0.00</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.textWrap}>
            <Text style={styles.tableCell}>Total Ventas Gravadas</Text>
            <Text>S/</Text>
          </View>
          <Text style={styles.tableCell}>{subTotal}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.textWrap}>
            <Text style={styles.tableCell}>Total IGV (18%)</Text>
            <Text>S/</Text>
          </View>
          <Text style={styles.tableCell}>{igv}</Text>
        </View>
        <View style={styles.total}>
          <View style={styles.textWrap}>
            <Text style={styles.tableCell}>Total</Text>
            <Text>S/</Text>
          </View>
          <Text style={styles.tableCell}>{total}</Text>
        </View>
      </View>
    </View>
  )
}
