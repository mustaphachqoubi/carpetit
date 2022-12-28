const Carpets = [
  {
    id: 1,
    image:
      "https://img.freepik.com/free-photo/grey-carpet-background_1339-7412.jpg?w=2000",
    title: "Carpet One",
    desc: "Bni warain new carpet",
    price: "756",
  },
  {
    id: 2,
    image:
      "https://thumbs.dreamstime.com/b/grey-carpet-background-texture-dense-gray-carpet-texture-dense-gray-carpet-grey-carpet-background-191459290.jpg",
    title: "Carpet Two",
    desc: "Bni warain new carpet",
    price: "156",
  },
  {
    id: 3,
    image: "https://preview.pixlr.com/images/800wm/100/2/100256163.jpg",
    title: "Carpet Three",
    desc: "Bni warain new carpet",
    price: "1200",
  },
  {
    id: 4,
    image:
      "https://ctl.s6img.com/society6/img/Q7rTrIqNiW9wzNm9q1dHOAOvhkE/w_1500/rugs/2x3/lifestyle/~artwork,fw_5000,fh_7400,fx_-62,iw_5123,ih_7400/s6-original-art-uploads/society6/uploads/misc/315c4fe97b724225b5529568a8189b03/~~/abstract-leopard-with-red-lips-illustration-in-fuchsia-background-rugs.jpg",
    title: "Carpet Four",
    desc: "Bni warain new carpet",
    price: "340",
  },
  {
    id: 5,
    image:
      "https://besthqwallpapers.com/Uploads/8-5-2019/90618/thumb-black-knitted-texture-fabric-texture-black-carpet-texture-black-knitted-background.jpg",
    title: "Carpet Four",
    desc: "Bni warain new carpet",
    price: "800",
  },
  {
    id: 6,
    image:
      "https://previews.123rf.com/images/misterforeman/misterforeman1801/misterforeman180100475/93280955-white-carpet-background-textile-texture.jpg?fj=1",
    title: "Carpet Four",
    desc: "Bni warain new carpet",
    price: "995",
  },
  {
    id: 7,
    image:
      "https://thumbs.dreamstime.com/b/purple-carpet-texture-horizontal-background-abstract-96123084.jpg",
    title: "Carpet Four",
    desc: "Bni warain new carpet",
    price: "830",
  },
  {
    id: 8,
    image:
      "https://thumbs.dreamstime.com/b/closeup-surface-abstract-fabric-pattern-purple-carpet-floor-house-texture-background-108793536.jpg",
    title: "Carpet Four",
    desc: "Bni warain new carpet",
    price: "420",
  },
];

const Filtering = [
  {
    id: 1,
    title: "Type",
    filterList: ["Europian", "Amazigh", "Arabian"],
    f: ["europian", "amazigh", "arabian"],
  },
  {
    id: 2,
    title: "Date",
    filterList: ["Today", "Last Month", "Recent"],
    f: ["today", "last month", "recent"],
  },
  {
    id: 3,
    title: "Price",
    filterList: ["$200", "$500", "$1000"],
    f: ["$200", "$500", "$1000"],
  },
];

const Candidates = [
  {
    id: 0,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://bestlifeonline.com/wp-content/uploads/sites/3/2017/05/shutterstock_529646395.jpg?quality=82&strip=all",
  },
  {
    id: 1,
    name: "Michael Foster",
    email: "michaelfoster@example.com",
    aplied_on: "January 7, 2020",
    img: "https://static.photocdn.pt/images/articles/2019/08/07/images/articles/2019/07/31/linkedin_profile_picture_tips-1.webp",
  },
  {
    id: 2,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2021/06/FINAL-Blog-Images-1-2-1024x683.jpg",
  },
  {
    id: 3,
    name: "Michael Foster",
    email: "michaelfoster@example.com",
    aplied_on: "January 7, 2020",
    img: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F475971%2Fsmiling-man-in-business-suit_gettyimages-674199444.jpg&op=resize&w=700",
  },
  {
    id: 4,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://i.pinimg.com/736x/e5/13/33/e513339a410a97dd979c4c86c22a164b.jpg",
  },
  {
    id: 5,
    name: "Michael Foster",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://eddie-hernandez.com/wp-content/uploads/2019/07/Professional_Headshots_21.jpg",
  },
  {
    id: 6,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://cdn.goodgallery.com/43c626f7-8ba8-4d07-ad72-507ebfd31e76/r/0480/1xda70ya/best-professional-headshots-linkedin-profile.jpg",
  },
  {
    id: 7,
    name: "Michael Foster",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://www.corporatephotographerslondon.com/wp-content/uploads/2016/06/London-LinkedIn-Headshot.jpg",
  },
  {
    id: 8,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/34217-MLS-Fabian-Ekker-003flin.jpg",
  },
  {
    id: 9,
    name: "Michael Foster",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://images.squarespace-cdn.com/content/v1/512ae5eae4b099777377a98e/1411533762880-MHMSGQ1BYDP0F0HIPQKT/image-asset.jpeg",
  },
  {
    id: 10,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://blog.linkedin.com/content/dam/blog/en-us/corporate/blog/2014/07/Wayne_Pryor_L3177_SQ.jpg.jpeg",
  },

  {
    id: 11,
    name: "Michael Foster",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg?format=1000w",
  },
  {
    id: 12,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F475971%2Fsmiling-man-in-business-suit_gettyimages-674199444.jpg&op=resize&w=700",
  },
  {
    id: 13,
    name: "Michael Foster",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://chicagophotovideo.com/wp-content/uploads/2017/10/ezgif.com-webp-to-jpg-17.jpg",
  },
  {
    id: 14,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://jonbradley.co.uk/wp-content/uploads/2022/09/BUSINESS-HEADSHOT-PHOTOGRAPHY.jpg",
  },
  {
    id: 15,
    name: "Michael Foster",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://images.squarespace-cdn.com/content/v1/5852d625e3df2841c2448bd1/1491252837261-1O2LG6YF08KZ1XUY7V1I/business-man-headshots-boulder.jpg",
  },
  {
    id: 16,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://earthyphotography.co.uk/wp-content/uploads/2020/08/11-143273-pp_gallery/Working-From-Home-Headshots-Colour-Background-Taken-With-A-Phone.jpg",
  },
  {
    id: 17,
    name: "Michael Foster",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://nycphoto.com/wp-content/uploads/2020/03/f812eb92-lawyer-headshots-2.jpg",
  },
  {
    id: 18,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png",
  },
  {
    id: 19,
    name: "Michael Foster",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://www.corporatephotographylondon.com/wp-content/uploads/2015/04/Corporate-Headshot-London-offices.jpg",
  },
  {
    id: 20,
    name: "Emily Selman",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://nycphoto.com/wp-content/uploads/2020/02/d54af281-real-estate-headshots-nyc-05.jpg",
  },
  {
    id: 21,
    name: "Michael Foster",
    email: "emilyselman@example.com",
    aplied_on: "January 7, 2020",
    img: "https://nycphoto.com/wp-content/uploads/2022/01/linkedin-headshot-nyc.jpg",
  },
];

const youcanLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS47iOMn9TD4QfJ35pzdMiHPiHUjzA3aoP1OL75zb61D6ody59E'

export { Carpets, Filtering };
