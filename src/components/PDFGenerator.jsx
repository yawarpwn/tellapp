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
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column'
  },
});

const PDFGenerator = ({quotation}) => {
  return (
    <Document >
      <Page size="A4" style={styles.page}>
        <QuoHeader />
        <QuoCustomer quotation={quotation} />
        <QuoTable items={quotation.items} />
        <QuoTotal items={quotation.items}  />
        <QuoTerms />
        <QuoBAnkInfo />
      </Page>
    </Document>
  );
};

export default React.memo(PDFGenerator);

