const body = document.querySelector("body");
const header = body.querySelector("header");
const navbar = header.querySelector(".navbar");
const height_header = header.getBoundingClientRect().height;
let navlist = navbar.querySelector(".nav-list");

window.addEventListener("scroll", () => {
  new IntersectionObserver((e_iosv) => {
    // console.log(e[0]);
    // console.log(-view_lost);
    // console.log(height_header);
    let c_class = header.classList.contains("hd");
    let view_lost = e_iosv[0].boundingClientRect.top;
    if (!c_class && -view_lost >= height_header) {
      header.classList.add("hd");
    }
    if (c_class && -view_lost < height_header) {
      header.classList.remove("hd");
    }
  }).observe(body);
});

const e_menu_nav_click = (btn) => {
  const child_Nodes = btn.querySelectorAll("div");
  if (navlist.classList.contains("nav-cls")) {
    navlist.classList.remove("nav-cls");
    navlist.classList.add("nav-opn");
    child_Nodes[0].className = "ic-op-nav-icc-bf";
    child_Nodes[1].className = "ic-op-nav-icc-dv";
    child_Nodes[2].className = "ic-op-nav-icc-af";
  } else {
    if (navlist.classList.contains("nav-opn")) {
      navlist.classList.remove("nav-opn");
      navlist.classList.add("nav-cls");
      child_Nodes[0].className = "ic-op-nav-ini-bf";
      child_Nodes[1].className = "ic-op-nav-ini-dv";
      child_Nodes[2].className = "ic-op-nav-ini-af";
    }
  }
};

const ar_btn_menu = () => {
  new IntersectionObserver((e) => {
    let wd_bd = e[0].boundingClientRect.width;
    let exs_btn_opnav = navbar.querySelector(".ic-menu-nav");
    if (wd_bd <= 900 && !exs_btn_opnav) {
      let nav_out = navlist;
      navbar.removeChild(navlist);
      body.appendChild(nav_out);
      navlist = nav_out;
      const btn_menu = document.createElement("button");
      btn_menu.classList.add("ic-menu-nav");
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      div1.classList.add("ic-op-nav-ini-bf");
      div2.classList.add("ic-op-nav-ini-dv");
      div3.classList.add("ic-op-nav-ini-af");

      btn_menu.appendChild(div1);
      btn_menu.appendChild(div2);
      btn_menu.appendChild(div3);
      navbar.appendChild(btn_menu);
      navbar.classList.add("nav-fx-op");
      navlist.classList.add("nav-cls");
      btn_menu.addEventListener("click", () => {
        e_menu_nav_click(btn_menu);
      });
      body.classList.add("mb");
      move_in_page();
    }

    if (wd_bd > 900) {
      let nav_in = navlist;
      try {
        body.removeChild(navlist);
      } catch (ex) {}
      navbar.appendChild(nav_in);
      navlist = nav_in;
      navbar.classList.remove("nav-fx-op");
      try {
        navbar.removeChild(exs_btn_opnav);
      } catch (ex) {}
      navlist.classList.contains("nav-cls")
        ? navlist.classList.remove("nav-cls")
        : navlist.classList.contains("nav-opn")
        ? navlist.classList.remove("nav-opn")
        : null;
      body.classList.remove("mb");
      move_in_page();
    }
  }).observe(body);
};

window.addEventListener("resize", () => {
  // console.log(e_iosv[0]);
  ar_btn_menu();
});

window.onload = () => {
  ar_btn_menu();
};

const e_click = () => {
  return new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
};

const e_links_move_click = (e, href) => {
  e.preventDefault();
  let nav_opn = body.querySelector(".nav-opn");
  if (nav_opn) {
    navbar.querySelector(".ic-menu-nav").dispatchEvent(e_click());
  }
  try {
    let id_el = document.querySelector(href);
    window.scrollTo({
      top: id_el.offsetTop,
      behavior: "smooth",
    });
  } catch (ex) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const move_in_page = () => {
  const links = document.querySelectorAll("a");
  links.forEach((item) => {
    // let ar = item.href.split("#");
    // console.log(ar);
    let href = item.getAttribute("href");
    if (href.startsWith("#")) {
      item.addEventListener("click", (ee) => {
        e_links_move_click(ee, href);
      });
    }
  });
};
move_in_page();
