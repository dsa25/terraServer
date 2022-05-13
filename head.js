module.exports = function header(title) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        *, ::after, ::before { box-sizing: border-box; }
        html{
          margin: 0;
          padding: 0;
        }
        body {
            min-height: 100%;
            line-height: 1.2;
            margin: 0;
            padding: 0;
            font-family: sans-serif;
        }

        table { border-collapse: collapse; border-spacing: 0; }

        .dib{display: inline-block;}
        .db{display: block;}
        .tac{text-align: center;}
        .tal{text-align: left;}
        .tar{text-align: right;}
        .flex { display: flex; }
        .inline_flex { display: inline-flex; }
        .fdc { flex-direction: column; }
        .fdcr { flex-direction: column-reverse; }
        .fdr { flex-direction: row; }
        .fdrr { flex-direction: row-reverse; }
        .jcsb { justify-content: space-between; }
        .jcsa { justify-content: space-around; }
        .jcc { justify-content: center; }
        .jcfe { justify-content: flex-end; }
        .jcfs { justify-content: flex-start; }
        .aic { align-items: center; }
        .ais { align-items: stretch; }
        .aifs { align-items: flex-start; }
        .aife { align-items: flex-end; }
        .fww { flex-wrap: wrap; }
        .fwnw { flex-wrap: nowrap; }
        .fwwr { flex-wrap: wrap-reverse; }
        .order1 { order: 1; }
        .order2 { order: 2; }
        .order3 { order: 3; }
        .acs { align-content: stretch; }
        .acc { align-content: center; }
        .acsb { align-content: space-between; }
        .acsa { align-content: space-around; }
        .acfs { align-content: flex-start; }
        .acfe { align-content: flex-end; }
        .asfs { align-self: flex-start; }
        .asfe { align-self: flex-end; }
        .asc { align-self: center; }
        .asa { align-self: auto; }
        .ass { align-self: stretch; }
        .asb { align-self: baseline; }

        .wsnw { white-space: nowrap; }
        .wsnw_3p { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .xl_100{width: 100%}
        .xl_70{width: 70%}
        .xl_50{width: 50%}
        .xl_30{width: 30%}
        .xl_35{width: 35%}
        .xl_20{width: 20%}
        .xl_15{width: 15%}
        .xl_10{width: 10%}

        .mt_10{margin-top: 10px;}

        .row{
            margin: 0 auto; 
            width: 100%; 
            max-width: 21cm; 
            min-width: 21cm; 
            padding: 0 15px;
        }
        .table{width: 100%; text-align: center;}
        .table th,
        .table td{padding: 3px 5px;}
        .table tr:not(:first-child):hover{opacity: 0.7}
        .table tr td:nth-child(1){width: 50px;}
        .table tr td:nth-child(2){width: 112px;}
        .table tr td:nth-child(3){width: 177px;}
        .table tr td:nth-child(4){width: 177px;}
        .table tr td:nth-child(5){width: 83px;}
        .table tr td:nth-child(6){width: 104px;}
        .table tr td:nth-child(7){width: 63px;}
        .table .wr_ico svg{
          display: inline-block;
          height: 16px;
          margin: 0 3px
        }


        .delegation{
          margin: 10px 0 30px;
        }
        .bb{
          display: inline-block;
          border-bottom: 1px solid currentColor;
          text-align: center;
          min-width: 50px;
          padding: 0 5px;
          text-indent: 0px;
        }
        .mw_100{min-width: 100px;}
        .bbe{
          text-indent: -9999px;
        }
        .bb_text{
          display: block;
        //   border-bottom: 1px solid currentColor;
          text-align: center;
          min-width: 50px;
          padding: 0 10px 25px;
          position: relative;
          white-space: nowrap;
          height: 18px;
          margin-bottom: 5px;
        }
        .bb_text::after{
          content: attr(data-text);
          display: block;
          position: absolute;
          top: 23px;
          left: 0;
          width: 100%;
          height: 16px;
          line-height: 16px;
          font-size: 12px;
          text-indent: 0;
        }
        .bb_text::before{
            content: '';
            display: block;
            position: absolute;
            left: 0;
            height: 1px;
            width: 100%;
            border-bottom: 1px solid currentColor;
            top: 23px;
        }

        .table_measur {
            margin: 0 0;
            border: 1px solid currentColor;
        }
        .table_measur td,
        .table_measur th {
            padding: 5px;
            border-right: 1px solid currentColor;
            border-bottom: 1px solid currentColor;
        }
        .table_measur tr:last-child td {
            border-bottom: none;
        }
        .table_measur tr td:last-child {
            border-right: none;
        }
        .table_measur th {
            background-color: #ffe4c4;
            padding-bottom: 15px;
        }
        .table_measur_tbl {
            width: 100%;
            text-align: center;
        }
        .table_measur .table_measur_tbl tr td {
            border-bottom: 1px solid currentColor
        }
        .table_measur .table_measur_tbl tr:last-child td {
            border-bottom: none;
        }
        .table_quests {
            margin: 10px 0 30px;
            border: 1px solid currentColor;
            font-size: 12px;
            width: 100%;
        }
        .table_quests th {
            background-color: #ffe4c4;
        }
        .table_quests td,
        .table_quests th {
            padding: 5px;
            border-right: 1px solid currentColor;
            border-bottom: 1px solid currentColor;
        }
        .table_quests tr:last-child td {
            border-bottom: none;
        }
        .table_quests tr td:last-child {
            border-right: none;
        }

.checkbox,
.radio {
    display: none;
}
.radio + label,
.checkbox + label {
    display: inline-block;
    position: relative;
    cursor: pointer;
    padding: 3px 0 0 0;
    text-indent: 20px;
    margin-top: 5px;
}
.radio + label::before,
.checkbox + label::before {
    display: block;
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    left: 0;
    top: 0;
}
.checkbox + label::before {
    border-radius: 3px;
    border: 1px solid currentColor;
}
.radio + label::before {
    border: 2px solid currentColor;
    border-radius: 50%;
}
.checkbox:checked + label::before {
    background-color: transparent;
}
.radio:checked + label::after,
.checkbox:checked + label::after {
    display: block;
    position: absolute;
    top: 0;
}
.checkbox:checked + label::after {
    content: "\\2713";
    font-weight: 900;
    text-indent: 0px;
    color: currentColor;
    height: 16px;
    width: 16px;
    line-height: 16px;
    text-align: center;
    left: 0;
}
.radio:checked + label::after {
    content: '';
    left: 4px;
    top: 4px;
    width: 8px;
    height: 8px;
    background: currentColor;
    border-radius: 50%;
}

      .span_check{
        display: inline-block;
        background-color: #ffe4c4;
        color: currentColor;
        font-weight: 700;
        padding: 1px 4px;
        text-indent: 0px;
        border-bottom: 1px solid currentColor;
      }
      .label_input{
        display: block;
        margin: 5px 0;
      }

      .input_text{
          display: block;
          max-width: 100%;
          width: 130px;
          margin: 0 auto;
          padding: 3px 4px;
          border-radius: 3px;
          border: 1px solid #ccc !important;
      }
      .input_text#id{width: 30px;}
      .input_text#date{width: 80px;}
      .input_text#tprp{width: 40px;}
      .input_text.gd{width: 60px;}

      .btn{
        display: inline-block;
        padding: 2px 5px;
        cursor: pointer;
      }

      .user{text-align: center;}
      .user > div{
          padding: 10px 5px;          
      }
      .select{
        padding: 2px 5px;
        max-width: 100%;
        width: 140px;
      }

    @media print {
        * {
            // -webkit-print-color-adjust: exact !important;   
            // color-adjust: exact !important;  
            // box-shadow: none;
            // text-shadow: none;            
        }
        // html, body{
        //     height: 297mm;
        //     width: 210mm;
        // }
        // @page {
        //     margin: 10mm 10mm 10mm 20mm;
        // }
        // ul, ol, table,
        //  span,
        //  span::after {
        //     page-break-inside: avoid;
        // }
    }



</style>
</head>

<body>
<div class="row">`
}
