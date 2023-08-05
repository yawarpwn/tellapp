import React from 'react'
import QuoBAnkInfo from './QuoBankInfo';
import QuoHeader from './QuoHeader';
import QuoTotal from './QuoTotal';
import QuoTable from './QuoTable'
import QuoCustomer from './QuoCustomer'
import { Document, Page,  StyleSheet } from '@react-pdf/renderer';
import QuoTerms from './QuoTerms';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 1.5,
    flexDirection: 'column'
  },
});

const PDFGenerator = ({quotation}) => {
  return (
    <Document title={`Cotización-${quotation.quoNumber}`} >
      <Page size='a4' style={styles.page}>
        <QuoHeader />
        <QuoCustomer quotation={quotation} />
        <QuoTable items={quotation.items} />
        <QuoTotal items={quotation.items}  />
        <QuoTerms deadline={quotation.deadline} />
        <QuoBAnkInfo />
      </Page>
    </Document>
  );
};

export default React.memo(PDFGenerator);

