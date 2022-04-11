//texto
var data = [
  "\x02L\n", // Important DPL/CLP must begin with STX (x02) on
  "A3\n",
  "D11\n",
  "H15\n",
  "Q1\n",
  "1" + // rotation
    "3" + // font size
    "1" + // width mult
    "1" + // height mult
    "000" + // pattern
    "0200" + //row bottom to top - max 200
    "0250" + // collumn left to right - max 400
    "TEST" + // data
    "\n",
  "E\n",
];

//barcode

var data = [
  "\x02L\n", // Important DPL/CLP must begin with STX (x02) on
  "A3\n",
  "D11\n",
  "H15\n",
  "Q1\n",
  "1A30000 " + //patern
    "0010 " + //row bot to top
    "0025" + // collumn left to right
    "00000001\n", // data
  "E\n",
];
var data = [
  "\x02L\n", // Important DPL/CLP must begin with STX (x02) on
  "A3\n",
  "D11\n",
  "H15\n",
  "Q1\n",
  "1A300000080015500000001\n",
  "E\n",
];

var data = "1A3000000500010 19450228";

var data = [
  "\x01#\n",
  "\x02L\n", // Important DPL/CLP must begin with STX (x02) on
  "A3\n",
  "D11\n",
  "H30\n",
  "Q1\n",
  //Etq 1
  //Renova
  "3" + // rotation
    "2" + // font size
    "1" + // width mult
    "1" + // height mult
    "000" + // pattern
    "0040" + //row bottom to top - max 200
    "0080" + // collumn left to right - max 400
    "RENOVA" + // data
    "\n",
  //Desc
  "3" + // rotation
    "2" + // font size
    "1" + // width mult
    "1" + // height mult
    "000" + // pattern
    "0065" + //row bottom to top - max 200
    "0110" + // collumn left to right - max 400
    "Description" + // data
    "\n",
  // Data
  "3" + // rotation
    "2" + // font size
    "1" + // width mult
    "1" + // height mult
    "000" + // pattern
    "0090" + //row bottom to top - max 200
    "0110" + // collumn left to right - max 400
    "19/03/2002" + // data
    "\n",
  //Tam
  "3" + // rotation
    "2" + // font size
    "1" + // width mult
    "1" + // height mult
    "000" + // pattern
    "0115" + //row bottom to top - max 200
    "0110" + // collumn left to right - max 400
    "Tam G" + // data
    "\n",
  //Preco
  "3" + // rotation
    "3" + // font size
    "1" + // width mult
    "1" + // height mult
    "000" + // pattern
    "0140" + //row bottom to top - max 200
    "0110" + // collumn left to right - max 400
    "R$30,00" + // data
    "\n",
  //Barcode
  "3D5200002000110000000001\n",
  "E\n",
];
