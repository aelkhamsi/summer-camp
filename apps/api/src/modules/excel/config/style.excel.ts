export const styleSheet = (sheet) => {
  // id style
  for (let i = 1; i <= 1; i++) {
    sheet.getColumn(i).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: 'ffe380' },
      fgColor: { argb: 'ffe380' },
    };
  }

  // personal informations style
  for (let i = 2; i <= 13; i++) {
    sheet.getColumn(i).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: 'FFFDDB' },
      fgColor: { argb: 'FFFDDB' },
    };
  }

  // education style
  for (let i = 14; i <= 21; i++) {
    sheet.getColumn(i).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: 'E4FFDE' },
      fgColor: { argb: 'E4FFDE' },
    };
  }

  // // math sprint style
  for (let i = 22; i <= 23; i++) {
    sheet.getColumn(i).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: 'baf9ff' },
      fgColor: { argb: 'baf9ff' },
    };
  }

  // best math video style
  for (let i = 24; i <= 28; i++) {
    sheet.getColumn(i).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: '8ecaff' },
      fgColor: { argb: '8ecaff' },
    };
  }

  // stand style
  for (let i = 29; i <= 31; i++) {
    sheet.getColumn(i).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: 'baf9ff' },
      fgColor: { argb: 'baf9ff' },
    };
  }

  // motivations style
  for (let i = 32; i <= 33; i++) {
    sheet.getColumn(i).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: '8ecaff' },
      fgColor: { argb: '8ecaff' },
    };
  }

  // status style
  for (let i = 34; i <= 37; i++) {
    sheet.getColumn(i).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: 'DAEAF6' },
      fgColor: { argb: 'DAEAF6' },
    };
  }

  // status style
  for (let i = 38; i <= 38; i++) {
    sheet.getColumn(i).fill = {
      type: 'pattern',
      pattern: 'solid',
      bgColor: { argb: 'ffe380' },
      fgColor: { argb: 'ffe380' },
    };
  }

  // header style
  sheet.getRow(1).height = 70;
  sheet.getRow(1).font = {
    size: 11.5,
    bold: true,
    color: { argb: 'FFFFFF' },
  };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    bgColor: { argb: '272163' },
    fgColor: { argb: '272163' },
  };
  sheet.getRow(1).alignment = {
    vertical: 'middle',
    horizontal: 'center',
    wrapText: true,
  };
  sheet.getRow(1).border = {
    top: { style: 'thin', color: { argb: 'FFFFFF' } },
    left: { style: 'thin', color: { argb: 'FFFFFF' } },
    bottom: { style: 'thin', color: { argb: 'FFFFFF' } },
    right: { style: 'thin', color: { argb: 'FFFFFF' } },
  };
};
