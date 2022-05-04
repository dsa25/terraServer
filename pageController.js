const head = require("./page/head")

class pageController {
  constructor(title, list, hostname, url) {
    this.title = title
    this.list = list
    this.hostname = hostname
    this.url = url
  }

  buildingPart =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.6 483.2 483.9 512 448.5 512H326.4L288 448L368.8 380.7C376.6 374.1 376.5 362.1 368.5 355.8L250.6 263.2C235.1 251.7 216.8 270.1 227.8 285.2L288 368L202.5 439.2C196.5 444.3 194.1 452.1 199.1 459.8L230.4 512H128.1C92.75 512 64.09 483.3 64.09 448V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L416 100.7V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"/></svg>'
  mastTransformer =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M381.2 172.8C377.1 164.9 368.9 160 360 160h-156.6l50.84-127.1c2.969-7.375 2.062-15.78-2.406-22.38S239.1 0 232 0h-176C43.97 0 33.81 8.906 32.22 20.84l-32 240C-.7179 267.7 1.376 274.6 5.938 279.8C10.5 285 17.09 288 24 288h146.3l-41.78 194.1c-2.406 11.22 3.469 22.56 14 27.09C145.6 511.4 148.8 512 152 512c7.719 0 15.22-3.75 19.81-10.44l208-304C384.8 190.2 385.4 180.7 381.2 172.8z"/></svg>'
  measurements =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg>'

  getIcon(type) {
    if (type == "mastTransformer") return this.mastTransformer
    if (type == "buildingPart") return this.buildingPart
    if (type == "measurements") return this.measurements
    return "not"
  }

  get listInspects() {
    let html = head(this.title)
    html += `<table class="table">
        <tr>
        <th>№</th>
        <th>Дата</th>
        <th>ФИО</th>
        <th>Адресс</th>
        <th>Тип</th>
        <th>Файл</th>
        </tr>
        ${this.list
          .map(
            (item) => `<tr>
            <td>${item.id}</td>
            <td>${item.date}</td>
            <td>${item.fio}</td>
            <td>${item.address}</td>
            <td>
            <div class="wr_ico flex jcc">
            ${this.getIcon(item.type)}
            ${item.measur ? " + " + this.measurements : ""}
            </div>
            </td>
            <td><a href="${this.url}/${
              item.id
            }">file</a> <span style="font-size: 12px;">v:${item.v}</span></td>
        </tr>`
          )
          .join("")}
      </table>`
    html += "</div></body></html>"
    return html
  }

  // ///////////////////////////////////////

  header(dd, type) {
    let html = `
    <header class="flex jcsb aifs">
      <div>
        <p>
        ${
          type == "measurements"
            ? dd.headers[0] + "<span>" + dd.date + "</span>"
            : "Лист осмотра № <span class='bb'>" +
              this.list[0].id +
              "</span> от <span>" +
              dd.date +
              "</span>"
        }
        </p>
        <p>${dd.fields[0].label} <span class="bb">${
      dd.fields[0].input
    }</span></p>
        <p>${dd.fields[1].label} <span class="bb">${
      dd.fields[1].input
    }</span></p>
        <p>Напряжение: 
          ${dd.fields[2].label} <span class="bb">${dd.fields[2].input}</span>
          ${dd.fields[3].label} <span class="bb">${dd.fields[3].input}</span>
        </p>
        <p>${dd.fields[4].label} <span class="bb">${
      dd.fields[4].input
    }</span></p>
      </div>

      <div class="tar">
        <p>Согласовано: </p>
        <p>Директор ООО "Терра"</p>
        <p style="margin-top: 18px;"><span class="dib bb bbe mw_100">1</span> Коваленко А.В.</p>
      </div>

    </header>
    `
    return html
  }

  delegation(users) {
    let html = `
      <section class="delegation">
        <p>${users.text}</p>
        ${users.other
          .map(
            (item) => `
            <div class="flex jcsb aifs mt_10">
              <span class="xl_20 bb_text" data-text="Ф.И.О.">${item.fio}</span>
              <span class="xl_20 bb_text bbe" data-text="подпись">.</span>
              <span class="xl_20 bb_text" data-text="должность">
                ${users.master.post === "1" ? "мастер" : "электромонтер"}
              </span>
              <span class="xl_20 bb_text" data-text="группа допуска">
                ${item.groupDop}
              </span>
            </div>
        `
          )
          .join("")}
        <p>Ответственный: </p>
        <div class="flex jcsb aifs">
          <span class="xl_20 bb_text" data-text="Ф.И.О.">
            ${users.master.fio}
          </span>
          <span class="xl_20 bb_text bbe" data-text="подпись">.</span>
          <span class="xl_20 bb_text" data-text="должность">
            ${users.master.post == "1" ? "мастер" : "электромонтер"}
          </span>
          <span class="xl_20 bb_text" data-text="группа допуска">
            ${users.master.groupDop}
          </span>
        </div>
      </section>
    `
    return html
  }

  blankMeasur(bm) {
    let html = `
            <table class="table_measur">
            <tr>
                <th style="padding: 5px 7px;">№</th>
                <th>Описание точки в которой производились замеры</th>
                <th class="xl_35" style="padding: 5px 0 0 0;">
                    <div>Показания измерений по напряжени, V</div>
                    <table class="xl_100" style="margin-top: 10px;">
                        <tr style="border-top: 1px solid currentColor;">
                            <td class="xl_50" style="padding: 1px;">U<span style="font-size: 12px;">линейное</span></td>
                            <td class="xl_50" style="padding: 1px;">U<span style="font-size: 12px;">фазное</span></td>
                        </tr>
                    </table>
                </th>
                <th>Показания измерений по силе тока, A</th>
            </tr>
            ${bm.inputs
              .map(
                (input, index) => `
              <tr class="tac">
                <td style="padding: 0 7px;">${index + 1}</td>
                <td style="padding: 0 5px;">${input[0]}</td>
                <td style="padding: 0;">
                    <table class="table_measur_tbl">
                        <tr>
                            <td class="xl_15 wsnw">A-B</td>
                            <td class="xl_35">${input[1]}</td>
                            <td class="xl_15 wsnw">A-N</td>
                            <td class="xl_35">${input[2]}</td>
                        </tr>
                        <tr>
                            <td class="xl_15 wsnw">B-C</td>
                            <td class="xl_35">${input[3]}</td>
                            <td class="xl_15 wsnw">B-N</td>
                            <td class="xl_35">${input[4]}</td>
                        </tr>
                        <tr>
                            <td class="xl_15 wsnw">C-A</td>
                            <td class="xl_35">${input[5]}</td>
                            <td class="xl_15 wsnw">C-N</td>
                            <td class="xl_35">${input[6]}</td>
                        </tr>
                    </table>
                </td>
                <td style="padding: 0;">
                    <table class="table_measur_tbl">
                        <tr>
                            <td class="xl_30 wsnw">Фаза A</td>
                            <td class="xl_70">${input[7]}</td>
                        </tr>
                        <tr>
                            <td class="xl_30 wsnw">Фаза B</td>
                            <td class="xl_70">${input[8]}</td>
                        </tr>
                        <tr>
                            <td class="xl_30 wsnw">Фаза C</td>
                            <td class="xl_70">${input[9]}</td>
                        </tr>
                    </table>
                </td>
            </tr>
              `
              )
              .join("")}
            <tr>
                <td class="tac">${bm.inputs.length + 1}</td>
                <td>
                    <div>Положение анцапфы (переключателя) силового трансформатора.</div>
                    <div>При визуальной доступности!</div>
                </td>
                <td>${bm.lastInput}</td>
            </tr>
        </table>
    `
    return html
  }

  listCheckboxText(answer) {
    let result = answer.text
    answer.checkbox.forEach((item) => {
      if (item.check == true) {
        result = result.replace(
          new RegExp(item.text, "g"),
          `<span class="span_check">${item.text}</span>`
        )
      }
    })
    return result
  }

  typeAnswer(answer) {
    if (answer.type == "text") {
      return `<div>
        <input type="checkbox" disabled class="checkbox" ${
          answer.check == true ? "checked" : ""
        }>
        <label>${answer.text}</label>
      </div>`
    }

    if (answer.type == "input") {
      return `<div>
        <input type="checkbox" disabled class="checkbox" ${
          answer.check == true ? "checked" : ""
        }>
        <label><span class="bb mw_100">${answer.input}</span></label>
      </div>`
    }

    if (answer.type == "textInput") {
      return `<div>
        <input type="checkbox" disabled class="checkbox" ${
          answer.check == true ? "checked" : ""
        }>
        <label>${answer.text} <span class="bb">${answer.input}</span></label>
      </div>`
    }

    if (answer.type == "radio") {
      return `<div>
        <input type="checkbox" disabled class="checkbox" ${
          answer.check == true ? "checked" : ""
        }>
        <label>${
          answer.check == true
            ? answer.text.replace(
                new RegExp(answer.radio.list[answer.radio.value], "g"),
                `<span class="span_check">${
                  answer.radio.list[answer.radio.value]
                }</span>`
              )
            : answer.text
        }</label>
      </div>`
    }

    if (answer.type == "radioInput") {
      return `<div>
            <input type="checkbox" disabled class="checkbox" ${
              answer.check == true ? "checked" : ""
            }>
            <label>${
              answer.check == true
                ? answer.text.replace(
                    new RegExp(answer.radio.list[answer.radio.value], "g"),
                    `<span class="span_check">${
                      answer.radio.list[answer.radio.value]
                    }</span>`
                  )
                : answer.text
            } <span class="bb">${answer.input}</span></label>
                  </div>`
    }

    if (answer.type == "checkbox") {
      return `<div>
      <input type="checkbox" disabled class="checkbox" ${
        answer.check == true ? "checked" : ""
      }>
        <label>${
          answer.check == true ? this.listCheckboxText(answer) : answer.text
        }</label>
      </div>`
    }

    if (answer.type == "listTextInput") {
      return `
      <div>${answer.text} </div>
      ${answer.list
        .map(
          (item) =>
            `<label class="label_input">${item.text} <span class="bb mw_100">${item.input}</span></label>`
        )
        .join("")}
      `
    }

    return ""
  }

  getHeadTbl(headers, id) {
    let head = headers.filter((item) => item.index[0] == id)
    let html = ""
    if (head.length != 0) {
      html = `
        <tr>
          <th class="xl_10"></th>
          <th class="xl_50">${head[0].title}</th>
          <th class="xl_40"></th>
        </tr>
      `
    }
    return html
  }

  quests(quests) {
    // console.log("dl", quests)
    let html = `
    <table class="table_quests">
      <tr>
          <th class="tac xl_10">№</th>
          <th class="xl_50">${quests.name}</th>
          <th class="xl_40 tac">Результат осмотра</th>
      </tr>
      ${quests.questions
        .map(
          (quest) => `
          ${this.getHeadTbl(quests.headers, quest.id)}
        <tr>
          <td class="tac xl_10">${quest.id}</td>
          <td class="xl_50">${quest.quest}</td>
          <td class="xl_40">
              ${quest.opt.map((item) => this.typeAnswer(item)).join("")}
            </td>
        </tr>
      `
        )
        .join("")}

    </table>
    `
    return html
  }

  get inspection() {
    console.log("host", this.hostname)
    // console.log("master", this.list[0])
    let DL = JSON.parse(this.list[0].DL)
    let title = `${
      this.list[0].type == "measurements"
        ? "Бланк замеров № "
        : "Лист осмотра № "
    } ${this.list[0].id} от ${this.list[0].date} ${this.list[0].address}`
    let html = head(title)
    html += this.header(DL.delegation, this.list[0].type)

    if (this.list[0].type == "measurements") {
      html += this.blankMeasur(DL.measurements)
    } else {
      html += this.quests(DL.quests)
      if (this.list[0].measur === 1) html += this.blankMeasur(DL.measurements)
    }

    html += this.delegation(DL.delegation.users)
    html += "</div></body></html>"
    return html
  }
}

module.exports = pageController
