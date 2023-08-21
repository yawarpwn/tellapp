import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import React from 'react'
import QuoBAnkInfo from './BankInfo'
import QuoCustomer from './Customer'
import QuoHeader from './Header'
import QuoTable from './Table'
import QuoTerms from './Terms'
import QuoTotal from './Total'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
})

const PDFGenerator = ({ quotation }) => {
  return (
    <Document title={`Cotización-${quotation.quo_number}`}>
      <Page
        size="a4"
        style={styles.page}
      >
        <QuoHeader />
        <QuoCustomer quotation={quotation} />
        <QuoTable items={quotation.quotation_items} />
        <QuoTotal items={quotation.quotation_items} />
        <QuoTerms deadline={quotation.deadline} />
        <QuoBAnkInfo />
      </Page>
    </Document>
  )
}

export default React.memo(PDFGenerator)
