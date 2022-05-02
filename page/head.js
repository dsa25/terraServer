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
        body {
            min-height: 100%;
            line-height: 1.2;
        }
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

        .row{margin: 0 auto; width: 100%; max-width: 960px; padding: 0 15px;}
        .table{width: 100%; text-align: center;}
        .table th,
        .table td{padding: 3px 5px;}
        .table tr:not(:first-child):hover{opacity: 0.7}
        .table .wr_ico{}
        .table .wr_ico svg{
          display: inline-block;
          height: 16px;
          margin: 0 3px
        }
</style>
</head>

<body>
<div class="row">`
}
