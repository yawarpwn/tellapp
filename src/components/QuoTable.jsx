import { Text, View, StyleSheet } from "@react-pdf/renderer"
const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    fontSize: 8
  },

  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
    borderBottom: '2px solid black',
    borderTop: '2px solid black'
  },
  item: {
    width: '2%',
    textAlign: 'center'
  },

  desc: {
    width: '66%',
    textAlign: 'left'
  },

  size: {
    width: '7%',
    textAlign: 'center'
  },

  amount: {
    width: '7%',
    textAlign: 'center'
  },

  price: {
    width: '7%',
    textAlign: 'right'
  },

  total: {
    width: '7%',
    textAlign: 'right',
  },
  tableItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: '100%',
    fontStyle: 'bold',
  }
})


export default function Table({ items }) {
  const roundedNumber = (number) => {
    const rounded = Math.round((number / 1.18) * 100) / 100
    return rounded.toFixed(2)
  }
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader} >
        <Text style={styles.item}>No</Text>
        <Text style={{ ...styles.desc, textAlign: 'center' }}>DESCRIPCIÓN</Text>
        <Text style={styles.size}>U/M</Text>
        <Text style={styles.amount}>CANT.</Text>
        <Text style={styles.price}>P. UNIT</Text>
        <Text style={styles.total}>MONTO</Text>
      </View>
      {items.map(({ id, desc, rate, size, qty }, index) => {
        const isOdd = index % 2 !== 0
        return (
          <View key={id} style={{ ...styles.tableItems, backgroundColor: isOdd ? '#EEE' : '#fff' }}>
            <Text style={styles.item}>{index + 1}</Text>
            <Text style={styles.desc}>{desc}</Text>
            <Text style={styles.size}>{size}</Text>
            <Text style={styles.amount}>{qty}</Text>
            <Text style={styles.price}>{(rate).toFixed(2)}</Text>
            <Text style={styles.total}>{(rate * qty).toFixed(2)}</Text>
          </View>
        )
      })}
    </View>
  )
}
