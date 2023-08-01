import { View, Text, StyleSheet } from '@react-pdf/renderer'
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowLeft: {
    width: '70%',
  },

  rowRight: {
    width: '30%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,

  },
  left: {
    width: '10%'
  },
  center: {
    width: '2%'
  },
  right: {
    width: '88%'
  },
  l: {
    width: '38%'
  }, 
  c: {
    width: '4%'
  }, 
  r: {
    width: '58%',
    textAlign: 'right'
  }
})
export default function QuoCustomer({quotation}) {
  const { company, ruc, phone, quoNumber = 0, date } = quotation
  return (

    <View style={styles.container}>
      <View style={styles.rowLeft}>
        <View style={styles.row}>
          <Text style={styles.left}>Cliente</Text>
          <Text style={styles.center}>:</Text>
          <Text style={styles.right}>{company}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Ruc</Text>
          <Text style={styles.center}>:</Text>
          <Text style={styles.right}>{ruc}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Tel</Text>
          <Text style={styles.center}>:</Text>
          <Text style={styles.right}>{phone}</Text>
        </View>
      </View>

      <View style={styles.rowRight}>
        <View style={styles.row}>
          <Text style={styles.l}>Cotización</Text>
          <Text style={styles.c}>:</Text>
          <Text style={styles.r}>{quoNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.l}>Fecha</Text>
          <Text style={styles.c}>:</Text>
          <Text style={styles.r}>{Intl.DateTimeFormat('en-US').format(new Date(date))}</Text>
        </View>

      </View>
    </View>
  )
}
