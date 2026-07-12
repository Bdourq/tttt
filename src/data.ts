export interface Color {
  name: string;
  hex: string;
  gradient?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  details: string;
  images: string[];
  videos?: string[];
  colors?: Color[];
  badge?: string;
  badgeType?: 'free' | 'best' | 'off' | 'default';
  saveAmount?: string;
  sizeType: 'numbers' | 'weight' | 'free';
  availableSizes: string[];
}

export const STORE_INFO = {
  name: "حكاية خيط",
  slogan: "أناقة شرعية تليق بكِ - جودة تركية أصلية",
  phone: "962775347250", // used in wa.me links - no leading 00 or + (WhatsApp deep links break otherwise)
  formattedPhone: "00962 77 534 7250",
  address: "عمان، الأردن - توصيل لكافة المحافظات",
};

export const PRODUCTS: Product[] = [
  {
    id: "istanbul-dress",
    name: "فستان إسطنبول \"الباموك\" التركي",
    price: 15,
    oldPrice: 25,
    details: "الأكثر طلباً - باموك قطن تركي أصلي، أكمام شيفون، مريح جداً للدوام والمناسبات. قماش بارد لا يشف.",
    images: [
      "/images/p3-1.jpg",
      "/images/p3-2.jpg",
      "/images/p3-3.jpg",
      "/images/p3-4.jpg",
      "/images/p3-5.jpg",
      "/images/p3-6.jpg",
      "/images/p3-7.jpg",
      "/images/p3-8.jpg",
    ],
    videos: [
      "/images/p3-v1.mp4",
      "/images/p3-v2.mp4"
    ],
    badge: "العرض الذهبي - تركي أصلي",
    badgeType: "free",
    saveAmount: "توفري 10 دنانير + 5 دنانير توصيل = خصم حقيقي!",
    colors: [
      { name: "أزرق ملكي", hex: "#1e3a8a" },
      { name: "أسود", hex: "#000000" },
      { name: "عنابي", hex: "#7f1d1d" },
      { name: "بيج", hex: "#d6b588" },
      { name: "سماوي", hex: "#a7d8f0" },
    ],
    sizeType: 'numbers',
    availableSizes: ["36", "38", "40", "42", "44"]
  },
  {
    id: "3-piece-set",
    name: "طقم الـ 3 قطع العصري",
    price: 10,
    oldPrice: 17,
    details: "بلوزة لف + بنطلون واسع + حزام - 4 ألوان صيفية - قماش كريب بارد وعملي جداً.",
    images: [
      "/images/p4-1.jpg",
      "/images/p4-2.jpg",
      "/images/p4-3.jpg",
      "/images/p4-4.jpg",
    ],
    videos: [
      "/images/p4-v1.mp4",
      "/images/p4-v2.mp4"
    ],
    badge: "عرض نار 10 دنانير فقط",
    badgeType: "best",
    colors: [
      { name: "بيج", hex: "#d6b588" },
      { name: "زيتي", hex: "#6b8e6b" },
      { name: "وردي", hex: "#d48a9a" },
      { name: "سماوي", hex: "#8fb5e8" },
    ],
    sizeType: 'weight',
    availableSizes: ["مقاس 1 (50-70 كغم)", "مقاس 2 (70-90 كغم)"]
  },
  {
    id: "pleated-abaya",
    name: "عباية كسرات بليسيه مع ستراس",
    price: 18,
    oldPrice: 25,
    details: "تفصيل كسرات أنيق على الأكمام وستراس ناعم - قماش ويب كوري فاخر لا يشف.",
    images: [
      "/images/p1-1.jpg",
      "/images/p1-2.jpg",
      "/images/p1-3.jpg",
      "/images/p1-4.jpg",
    ],
    videos: [
      "/images/p1-v2.mp4"
    ],
    badge: "خصم خاص - لفترة محدودة",
    badgeType: "off",
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "كحلي", hex: "#000080" },
      { name: "عنابي", hex: "#800000" },
    ],
    sizeType: 'free',
    availableSizes: ["فري سايز (حسب الطول)"]
  },
  {
    id: "fur-abaya",
    name: "فستان الريش الفاخر مع حزام",
    price: 10,
    oldPrice: 17,
    details: "أكمام مزينة بالريش الناعم + حزام يبرز الخصر - هيبة وأناقة للمناسبات الرسمية والزيارات.",
    images: [
      "/images/p2-1.jpg",
      "/images/p2-2.jpg",
      "/images/p2-3.jpg",
      "/images/p2-4.jpg",
    ],
    videos: [
      "/images/p2-v2.mp4"
    ],
    badge: "الأكثر مبيعاً 🌟",
    badgeType: "default",
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "بيج", hex: "#d6b588" },
      { name: "مارون", hex: "#4a0404" },
    ],
    sizeType: 'weight',
    availableSizes: ["مقاس 1 (50-70 كغم)", "مقاس 2 (70-90 كغم)"]
  }
];

export const FAQS = [
  {
    question: "هل السعر فعلاً يشمل التوصيل؟",
    answer: "نعم 100% - كل الأسعار الظاهرة تشمل التوصيل والمعاينة قبل الدفع، ما في أي رسوم مخفية. حتى عرض 2+1 مجاناً يشمل توصيل مجاني."
  },
  {
    question: "ما هي مقاسات فستان الباموك التركي؟",
    answer: "من 36 لـ 44، والقصة واسعة ومريحة. إذا محتارة بين مقاسين اختاري الأكبر."
  },
  {
    question: "كيف عرض اشتري 2 والثالث مجاناً؟",
    answer: "اختاري أي 3 موديلات (حتى لو نفس الموديل بألوان مختلفة) بتدفعي سعر 2 فقط. الأرخص هو المجاني. والتوصيل مجاني كمان."
  },
  {
    question: "هل بقدر أفتح الطرد قبل الدفع؟",
    answer: "أكيد، هذا حقك. افتحي الطرد، قيسي، افحصي القماش، إذا ما عجبك رجعيه مع المندوب بدون إحراج."
  }
];
