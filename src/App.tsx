import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, X, Award, Eye, Palette, ShieldAlert,
  ChevronRight, Fingerprint, Book, Flag, Mic, Target, CheckCircle,
  AlertTriangle, TrendingUp, Info, RefreshCw, Unlock
} from 'lucide-react';

const App = () => {
  const [idHienTai, setIdHienTai] = useState<string | null>(null);
  const [danhSachDaXem, setDanhSachDaXem] = useState<string[]>([]);
  const [daMoLopIntro, setDaMoLopIntro] = useState(true);
  const [cauHoiHienTai, setCauHoiHienTai] = useState(0);
  const [congCuDaNhan, setCongCuDaNhan] = useState<{ tool: string; correct: boolean; icon: React.ReactNode }[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [phanHoi, setPhanHoi] = useState<{ dung: boolean; giaiThich: string } | null>(null);
  const [showStageIntro, setShowStageIntro] = useState(false);

  const cauHoiQuiz = [
    {
      q: "Khi một kẻ nhặt banh được tung hô là 'vĩ nhân', điều tra viên cần tập trung vào điều gì để tìm ra sự thật?",
      a: [
        "Sự thay đổi trong trang phục và cách ăn nói của hắn.",
        "Sự mâu thuẫn giữa xuất thân thực tế và danh hiệu được gán ghép.",
        "Sự đồng thuận tuyệt đối của đám đông tại sân quần vợt."
      ],
      correct: 1,
      explain: "Bản chất nhân vật trào phúng nằm ở sự vênh lệch giữa 'cái bên trong' (vô học) và 'cái bên ngoài' (danh hiệu vĩ nhân).",
      tool: "Kính lúp (Soi chi tiết)",
      icon: <Search size={24} />
    },
    {
      q: "Tại sao Xuân Tóc Đỏ lại có thể 'thắng' mà không cần dùng đến tài năng thể thao?",
      a: [
        "Vì đối thủ của hắn quá yếu và sợ hãi trước uy danh của hắn.",
        "Vì hắn đã mua chuộc được toàn bộ trọng tài và mật thám hộ giá.",
        "Vì sự thối nát của hệ thống chính trị cần một 'anh hùng' để lấp liếm thất bại."
      ],
      correct: 2,
      explain: "Trong thế giới của Vũ Trọng Phụng, vinh quang thường là sản phẩm của những toan tính chính trị nực cười hơn là tài năng thực tế.",
      tool: "Máy ghi âm (Bắt lỗi ngôn từ)",
      icon: <Mic size={24} />
    },
    {
      q: "Kỹ năng 'Kết nối' (Connect) trong Linearthinking giúp gì cho việc điều tra hồ sơ này?",
      a: [
        "Tìm ra mối liên hệ giữa sự vô minh của đám đông và sự lên ngôi của kẻ lưu manh.",
        "Liệt kê tất cả các nhân vật xuất hiện trong đoạn trích để làm báo cáo.",
        "Chứng minh rằng Xuân Tóc Đỏ thực sự có tài năng thiên bẩm về ngoại giao."
      ],
      correct: 0,
      explain: "Tư duy hệ thống giúp ta thấy Xuân không tự nhiên thành vĩ nhân, mà do 'mảnh đất' xã hội quá màu mỡ cho sự giả dối.",
      tool: "Sơ đồ tư duy (Kết nối logic)",
      icon: <TrendingUp size={24} />
    },
    {
      q: "Phong trào 'Âu hóa' trong văn bản được điều tra viên nhìn nhận như thế nào?",
      a: [
        "Một cuộc cách mạng văn minh thực sự giúp nâng tầm trí tuệ cho xã hội đương thời.",
        "Một lớp sơn bóng bẩy nhưng kệch cỡm, che đậy sự mục nát và vô học bên trong.",
        "Một xu hướng thời trang giúp các nhân vật trở nên sang trọng và đáng kính hơn."
      ],
      correct: 1,
      explain: "'Âu hóa' chỉ là cái cớ để những kẻ lố lăng phô trương sự giàu sang và học thức giả hiệu mà họ không hề thấu hiểu.",
      tool: "Đèn pin (Soi sáng bối cảnh)",
      icon: <Info size={24} />
    },
    {
      q: "Dấu hỏi chấm (?) trong con dấu 'Anh hùng cứu quốc?' ám chỉ điều gì?",
      a: [
        "Sự nghi ngờ về khả năng thực sự của Xuân Tóc Đỏ trong môn quần vợt.",
        "Thái độ mỉa mai, châm biếm của tác giả về các giá trị bị đảo lộn trong xã hội.",
        "Một lỗi đánh máy trong hồ sơ điều tra chính thức của mật thám."
      ],
      correct: 1,
      explain: "Dấu hỏi là nhãn quan trào phúng, lật tẩy sự phi lý của danh hiệu mà xã hội ban tặng cho kẻ lưu manh như Xuân.",
      tool: "Chìa khóa (Giải mã bản chất)",
      icon: <Unlock size={24} />
    }
  ];

  const xuLyTraLoi = (idx: number) => {
    const cauHienTai = cauHoiQuiz[cauHoiHienTai];
    const laDung = idx === cauHienTai.correct;
    
    setPhanHoi({
      dung: laDung,
      giaiThich: cauHienTai.explain
    });
  };

  const tiepTucQuiz = () => {
    const cauHienTai = cauHoiQuiz[cauHoiHienTai];
    setCongCuDaNhan(prev => [...prev, { 
      tool: cauHienTai.tool, 
      correct: phanHoi?.dung ?? false,
      icon: cauHienTai.icon
    }]);
    setPhanHoi(null);

    if (cauHoiHienTai < cauHoiQuiz.length - 1) {
      setCauHoiHienTai(cauHoiHienTai + 1);
    } else {
      setShowQuiz(false);
    }
  };

  const tatCaChungCu = [
    {
      id: 'toc',
      ten: 'Mái Tóc Đỏ Rực',
      vung: 'Ngoại hình & Bản chất',
      mau: '#FF0000',
      icon: Fingerprint,
      danhSachBangChung: [
        { text: '“Thằng Xuân tóc đỏ, cái thằng nhặt banh ở sân quần vợt, cái thằng thổi loa cho hiệu thuốc lậu...”', highlight: ['nhặt banh', 'thổi loa', 'thuốc lậu'] },
        { text: '“Xuân Tóc Đỏ là bực anh hùng của núi sông!”', highlight: ['anh hùng', 'núi sông'] }
      ],
      noiDung: 'Mái tóc đỏ vốn là dấu hiệu của kẻ hạ lưu "nhặt banh quần", nay lại rực sáng dưới ánh đèn của sự sùng bái mù quáng. Nó biểu tượng cho sự lưu manh hóa nhảy vọt từ vỉa hè lên đài vinh quang nhờ sự nhố nhăng của thời đại.',
      ketLuan: 'Cái tên "Tóc Đỏ" trở thành một nhãn hiệu "anh hùng" giả tạo, che đậy bản chất vô học.',
      linearGuide: 'Linearthinking - Phân tích sự đối lập (Đối lập): Từ một đặc điểm nhận dạng hạ lưu ("nhặt banh"), mái tóc đỏ được "tái định nghĩa" thành biểu tượng của sự ưu tú. Cụ thể: Xã hội không nhìn vào bản chất vô học mà bị lóa mắt bởi cái tên được gán nhãn. Khái quát: Sự lên ngôi của cái biểu tượng rỗng tuếch trong một thời đại chuộng hình thức.'
    },
    {
      id: 'mu',
      ten: 'Chiếc Mũ "Vĩ Nhân"',
      vung: 'Danh hiệu ảo',
      mau: '#E91E63',
      icon: Award,
      danhSachBangChung: [
        { text: '“Ta không dám tự phụ là bậc anh hùng cứu quốc, nhưng ta phải tránh cho mi nạn chiến tranh rồi!”', highlight: ['anh hùng cứu quốc', 'tránh', 'nạn chiến tranh'] },
        { text: '“Cái mũ vinh quang được đội lên đầu Xuân không phải vì chiến tích thể thao.”', highlight: ['vinh quang', 'không phải', 'chiến tích'] }
      ],
      noiDung: 'Xuân không thắng bằng tài năng mà "thắng" bằng sự nhường nhịn đầy toan tính chính trị. Chiếc mũ vinh quang được đội lên đầu Xuân không phải vì chiến tích thể thao, mà vì khả năng diễn kịch cứu vãn một cuộc khủng hoảng ngoại giao nực cười.',
      ketLuan: 'Danh hiệu "Cứu quốc" thực chất là phần thưởng cho một vố lừa đảo công chúng vĩ đại.',
      linearGuide: 'Linearthinking - Đơn giản hóa (Đơn giản hóa): Thất bại cá nhân + Nhu cầu chính trị = Vinh quang dân tộc. Cụ thể: Việc thua cuộc được "marketing" thành sự hy sinh cao cả. Khái quát: Trong một hệ thống thối nát, sự thật luôn bị bóp méo để phục vụ cho những mục đích phù phiếm.'
    },
    {
      id: 'mat',
      ten: 'Đôi Mắt Đám Đông',
      vung: 'Tâm lý xã hội',
      mau: '#FFD700',
      icon: Eye,
      danhSachBangChung: [
        { text: '“Quần chúng nông nổi ơi! Mi đã biết đâu cái lòng hi sinh cao thượng vô cùng...”', highlight: ['nông nổi', 'hi sinh cao thượng'] },
        { text: '“Họ xoay chuyển từ phẫn nộ, chửi rủa sang cảm phục, hoan hô Vạn tuế!”', highlight: ['phẫn nộ', 'hoan hô', 'Vạn tuế'] }
      ],
      noiDung: 'Đám đông mấy nghìn người trên sân Rollandes Varreau hiện lên với cái nhìn hời hợt, dễ bị dắt mũi. Họ xoay chuyển từ phẫn nộ, chửi rủa "Quốc sỉ!" sang cảm phục, hoan hô "Vạn tuế!" chỉ sau một bài diễn thuyết sáo rỗng.',
      ketLuan: 'Sự vô minh và tính hiếu kỳ của đám đông là mảnh đất màu mỡ cho những kẻ cơ hội như Xuân lộng hành.',
      linearGuide: 'Linearthinking - Tìm mối liên hệ (Kết nối): Tâm lý đám đông + Sự trình diễn kịch tính = Sự sùng bái mù quáng. Cụ thể: Đám đông không có lập trường, chỉ phản ứng theo cảm xúc tức thời. Khái quát: Sức mạnh của dư luận dễ dàng bị thao túng bởi những kẻ biết diễn kịch.'
    },
    {
      id: 'mieng',
      ten: 'Cái Miệng Kịch Sĩ',
      vung: 'Ngôn ngữ & Thủ đoạn',
      mau: '#8B0000',
      icon: Mic,
      danhSachBangChung: [
        { text: '“Hỡi công chúng! Mi chưa hiểu rõ những lẽ cực kì to tát nó khiến ta phải đành nhường giải...”', highlight: ['chưa hiểu rõ', 'lẽ cực kì to tát', 'nhường giải'] },
        { text: '“Ngôn ngữ của một kẻ thổi loa cho hiệu thuốc lậu pha trộn vẻ trịch thượng.”', highlight: ['thổi loa', 'trịch thượng'] }
      ],
      noiDung: 'Với cái hùng biện của một kẻ "thổi loa cho hiệu thuốc lậu", Xuân đã biến sự thất bại nhục nhã thành một hành động hy sinh cao cả. Ngôn ngữ của Xuân là sự pha trộn giữa vẻ trịch thượng của "bậc vĩ nhân" and sự thô lỗ của kẻ vô học.',
      ketLuan: 'Trong một xã hội giả dối, kẻ diễn kịch giỏi nhất bằng miệng lưỡi sẽ trở thành kẻ thống trị.',
      linearGuide: 'Linearthinking - Phân tích cấu trúc (Cấu trúc): Ngôn từ đao to búa lớn / Nội dung rỗng tuếch. Cụ thể: Xuân dùng các từ "lẽ cực kỳ to tát" để lấp liếm sự trống rỗng về trí tuệ. Khái quát: Ngôn ngữ trở thành công cụ để ngụy tạo tri thức và đạo đức.'
    },
    {
      id: 'mat-trang',
      ten: 'Gương Mặt Rỗng',
      vung: 'Nhân cách',
      mau: '#C8E6C9',
      icon: Target,
      danhSachBangChung: [
        { text: '“Như một bậc vĩ nhân nhũn nhặn, nó giơ quả đấm chào loài người...”', highlight: ['vĩ nhân nhũn nhặn', 'giơ quả đấm'] },
        { text: '“Gương mặt Xuân là một tờ giấy trắng rỗng tuếch về nhân cách.”', highlight: ['tờ giấy trắng', 'rỗng tuếch'] }
      ],
      noiDung: 'Gương mặt Xuân là một tờ giấy trắng rỗng tuếch về nhân cách. Xã hội thượng lưu và đám đông tự tô vẽ lên đó những ảo tưởng về "anh hùng", "vĩ nhân", "giáo sư quần vợt" để phục vụ cho sự phù phiếm của chính họ.',
      ketLuan: 'Xuân là một "nhân thần" được đúc bằng sự ngu ngơ và đảo lộn giá trị của thời đại.',
      linearGuide: 'Linearthinking - Suy luận (Suy luận): Nhân vật rỗng = Tấm gương phản chiếu xã hội. Cụ thể: Xuân không có bản sắc, hắn là bất cứ ai mà xã hội muốn hắn trở thành. Khái quát: Thần tượng thường chỉ là vật chứa cho những ảo tưởng của đám đông.'
    },
    {
      id: 'ao',
      ten: 'Vỏ Bọc Âu Hóa',
      vung: 'Hình thức',
      mau: '#FF9800',
      icon: ShieldAlert,
      danhSachBangChung: [
        { text: '“Ta chỉ phụng sự công cuộc ngoại giao của Chính phủ mà thôi!”', highlight: ['phụng sự', 'ngoại giao', 'Chính phủ'] },
        { text: '“Bộ đồ thể thao và chiếc vợt quần vợt là những phụ kiện Âu hóa hời hợt.”', highlight: ['phụ kiện', 'Âu hóa', 'hời hợt'] }
      ],
      noiDung: 'Bộ đồ thể thao và chiếc vợt quần vợt là những phụ kiện của phong trào "Âu hóa" hời hợt. Xuân khoác lên mình cái vỏ văn minh để che đậy bản chất "lính cờ chạy hiệu rạp hát", biến sân quần vợt thành sân khấu chính trị.',
      ketLuan: 'Vỏ bọc càng trang trọng, bản chất lố lăng và sự kệch cỡm của xã hội càng lộ rõ.',
      linearGuide: 'Linearthinking - Phân tích biểu tượng (Biểu tượng): Trang phục thể thao = Văn minh giả hiệu. Cụ thể: Sự Âu hóa chỉ dừng lại ở lớp vỏ bọc bên ngoài. Khái quát: Sự kệch cỡm nảy sinh khi con người cố khoác lên mình những giá trị mà họ không thực sự thấu hiểu.'
    },
    {
      id: 'nen',
      ten: 'Bối Cảnh Nhố Nhăng',
      vung: 'Xã hội đương thời',
      mau: '#03A9F4',
      icon: Flag,
      danhSachBangChung: [
        { text: '“Sự đại bại vạn tuế!”', highlight: ['đại bại', 'vạn tuế'] },
        { text: '“Mật thám bận hộ giá đến mức không biết quán quân đang nằm trong nhà giam.”', highlight: ['hộ giá', 'nhà giam'] }
      ],
      noiDung: 'Một thế giới mà cái chết được gọi là "thể thao", sự thất bại được tung hô là "cứu quốc", and mật thám bận "hộ giá" đến mức không biết quán quân đang nằm trong nhà giam. Tất cả tạo nên một bức tranh biếm họa sâu cay về xã hội thực dân nửa phong kiến.',
      ketLuan: 'Xã hội là một sân khấu khổng lồ nơi bi kịch và hài kịch đan xen trong sự đảo lộn giá trị.',
      linearGuide: 'Linearthinking - Tổng hợp (Tổng hợp): Nghịch lý bao trùm (Paradox). Cụ thể: Khi các thiết chế xã hội (mật thám, chính phủ) cũng tham gia vào màn kịch, sự phi lý trở thành chuẩn mực. Khái quát: Một xã hội mục nát là nơi kẻ lưu manh và anh hùng không còn ranh giới.'
    }
  ];

  const laHoanThanh = danhSachDaXem.length === 7;

  const xuLyChon = (id: string) => {
    setIdHienTai(id);
    if (!danhSachDaXem.includes(id)) {
      setDanhSachDaXem([...danhSachDaXem, id]);
    }
  };

  const layMau = (id: string, mauGoc: string) => {
    if (laHoanThanh) return mauGoc;
    if (idHienTai === null) return '#D1D5DB';
    return idHienTai === id ? mauGoc : '#E5E7EB';
  };

  const layVien = (id: string) => {
    if (laHoanThanh) return '#000000';
    if (idHienTai === id) return '#000000';
    return '#CBD5E1';
  };

  const thongTinChon = tatCaChungCu.find(x => x.id === idHienTai);

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-slate-900 font-sans p-2 md:p-6">
      {/* Đầu trang */}
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-orange-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg text-white"><ShieldAlert size={20} /></div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-tighter">Hồ Sơ Điều Tra: <span className="text-red-600">Xuân Tóc Đỏ</span></h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{laHoanThanh ? 'Giải mã hoàn tất' : `Vật chứng: ${danhSachDaXem.length}/7 mảnh`}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Tiến trình điều tra</span>
            <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden border">
              <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${(danhSachDaXem.length / 7) * 100}%` }} />
            </div>
          </div>
          <button onClick={() => setDaMoLopIntro(true)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><Info size={20} /></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Danh sách vật chứng */}
        <div className="lg:col-span-3 space-y-3 order-2 lg:order-1">
          <div className="bg-white p-5 rounded-3xl border border-orange-100 shadow-sm">
            <h2 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Giải mã vật chứng</h2>
            <div className="space-y-2">
              {tatCaChungCu.map((s) => (
                <button
                  key={s.id}
                  onClick={() => xuLyChon(s.id)}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${idHienTai === s.id ? 'bg-slate-50' : 'bg-white border-transparent hover:bg-slate-50/50'}`}
                  style={{ borderColor: idHienTai === s.id ? s.mau : 'transparent' }}
                >
                  <div 
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${danhSachDaXem.includes(s.id) || laHoanThanh ? 'text-white shadow-sm ring-2 ring-white' : 'bg-slate-100 text-slate-400'}`}
                    style={{ backgroundColor: (danhSachDaXem.includes(s.id) || laHoanThanh) ? s.mau : undefined }}
                  >
                    {(danhSachDaXem.includes(s.id) || laHoanThanh) ? <s.icon size={16} /> : <Unlock size={14} />}
                  </div>
                  <span 
                    className="text-[11px] font-black uppercase transition-colors"
                    style={{ color: idHienTai === s.id ? s.mau : '#475569' }}
                  >
                    {s.ten}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tranh biếm họa & Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2 gap-6">
          <div className="w-full aspect-[4/5] bg-white p-4 rounded-[2.5rem] shadow-xl border-[10px] border-white relative overflow-hidden group">
            <AnimatePresence>
              {laHoanThanh && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: -10 }}
                  className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none bg-black/30 backdrop-blur-[2px]"
                >
                  <motion.div 
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [-10, -8, -10]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-red-600 border-8 border-white px-8 py-6 shadow-[0_0_60px_rgba(220,38,38,0.6)] transform skew-x-[-12deg] relative">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-white/20"
                      />
                      <span className="text-6xl md:text-7xl font-black text-white text-center leading-none block tracking-tighter drop-shadow-lg">
                        ANH HÙNG<br/>CỨU QUỐC?
                      </span>
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="mt-[-25px] bg-white text-red-600 px-10 py-3 font-black text-9xl shadow-2xl rounded-full border-4 border-red-600 z-20"
                    >
                      ?
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-lg">
              {/* Nền */}
              <rect x="0" y="0" width="400" height="500" fill={layMau('nen', '#7DD3FC')} className="cursor-pointer transition-all duration-500" onClick={() => xuLyChon('nen')} />
              
              {/* Tóc */}
              <path d="M70 180 L100 110 Q150 40 300 100 L340 400 L70 400 Z" fill={layMau('toc', '#FF0000')} stroke={layVien('toc')} strokeWidth="4" className="cursor-pointer transition-all duration-500" onClick={() => xuLyChon('toc')} />
              
              {/* Mũ */}
              <path d="M120 160 Q200 80 340 140 L360 220 Q250 170 120 230 Z" fill={layMau('mu', '#E91E63')} stroke={layVien('mu')} strokeWidth="4" className="cursor-pointer transition-all duration-500" onClick={() => xuLyChon('mu')} />
              <path d="M170 125 Q240 85 300 120" fill="none" stroke={idHienTai === 'mu' || laHoanThanh ? '#FF9800' : '#CBD5E1'} strokeWidth="10" strokeLinecap="round" />

              {/* Mặt */}
              <path d="M140 230 L260 200 L340 280 L300 420 Q220 480 130 420 Z" fill={layMau('mat-trang', '#C8E6C9')} stroke={layVien('mat-trang')} strokeWidth="5" className="cursor-pointer transition-all duration-500" onClick={() => xuLyChon('mat-trang')} />
              
              {/* Mắt */}
              <g className="cursor-pointer" onClick={() => xuLyChon('mat')}>
                <path d="M250 240 Q280 220 310 250 L300 270 Q270 255 250 275 Z" fill={layMau('mat', '#FFD700')} stroke={layVien('mat')} strokeWidth="3" />
                <circle cx="280" cy="245" r="5" fill={laHoanThanh || idHienTai === 'mat' ? 'black' : '#9CA3AF'} />
                <path d="M160 275 Q210 250 260 290 L250 310 Q200 285 165 315 Z" fill={layMau('mat', '#FFD700')} stroke={layVien('mat')} strokeWidth="3" />
                <circle cx="215" cy="290" r="6" fill={laHoanThanh || idHienTai === 'mat' ? 'black' : '#9CA3AF'} />
              </g>

              {/* Miệng */}
              <path d="M265 270 L290 350 L265 365" fill="none" stroke={layVien('mat-trang')} strokeWidth="4" strokeLinecap="round" />
              <path d="M200 400 Q240 380 280 415" fill="none" stroke={layMau('mieng', '#8B0000')} strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => xuLyChon('mieng')} />

              {/* Áo */}
              <path d="M90 435 L330 435 L350 500 L70 500 Z" fill={layMau('ao', '#FF9800')} stroke={layVien('ao')} strokeWidth="5" className="cursor-pointer transition-all duration-500" onClick={() => xuLyChon('ao')} />
            </svg>
            <div className="absolute top-6 left-6 bg-black/80 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${laHoanThanh ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
              {laHoanThanh ? 'Hồ sơ hoàn tất' : 'Đang trích lục'}
            </div>
          </div>

          {/* The Glory Paradox Gauge */}
          <div className="w-full bg-white p-6 rounded-3xl border border-orange-100 shadow-sm space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Trạng thái xã hội</span>
                <span className="text-[10px] font-black text-slate-600 uppercase">Lưu manh hạ lưu</span>
              </div>
              <div className="flex flex-col items-end">
                <TrendingUp size={14} className="text-red-600 mb-1" />
                <span className="text-[10px] font-black text-red-600 uppercase">Vĩ nhân cứu quốc</span>
              </div>
            </div>
            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden border p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-slate-400 to-red-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-2" 
                style={{ width: `${Math.max(5, (danhSachDaXem.length / 7) * 100)}%` }}
              >
                <div className="w-2 h-2 bg-white rounded-full shadow-lg animate-pulse" />
              </div>
            </div>
            <p className="text-[9px] text-center italic text-slate-400">Thanh đo Nghịch lý Vinh quang: Thể hiện quá trình "vĩ đại hóa" lố lăng</p>
          </div>
        </div>

        {/* Thông tin chi tiết / Investigation Conclusion */}
        <div className="lg:col-span-4 order-3">
          {laHoanThanh && !idHienTai ? (
            <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl text-white h-full flex flex-col animate-in zoom-in duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <AlertTriangle className="text-yellow-400" size={32} />
                <h2 className="text-2xl font-black uppercase italic leading-tight">Báo cáo tổng kết<br/>Chốt hạ hồ sơ</h2>
              </div>
              <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="text-[9px] font-black text-yellow-400 uppercase mb-2 tracking-widest">Kết luận điều tra</h4>
                  <p className="text-sm leading-relaxed opacity-90">
                    Xuân Tóc Đỏ không phải là một cá nhân đơn lẻ, mà là <span className="text-yellow-400 font-bold">"một tấn kịch xã hội"</span>. Hắn là sản phẩm hoàn hảo của một thời đại đảo lộn giá trị, nơi cái lưu manh được khoác áo vĩ nhân.
                  </p>
                </div>
                <div className="p-5 bg-orange-600/20 rounded-2xl border border-orange-600/30">
                  <h4 className="text-[9px] font-black text-orange-400 uppercase mb-2">Chỉ dẫn tiếp theo</h4>
                  <p className="text-sm leading-relaxed text-orange-100">
                    Chân dung đã lộ diện. Bây giờ, hãy <span className="font-bold underline">đọc lại văn bản</span>, suy ngẫm về sự lố lăng này và chuẩn bị tinh thần tiến vào <span className="font-bold text-white">Chặng 1: Sân quần vợt</span> - nơi màn kịch lên đến đỉnh điểm.
                  </p>
                </div>
                <div className="p-5 bg-red-600/20 rounded-2xl border border-red-600/30">
                  <h4 className="text-[9px] font-black text-red-400 uppercase mb-2">Thông điệp cốt lõi</h4>
                  <p className="text-base font-serif italic text-red-100">
                    "Xã hội là một sân khấu khổng lồ đầy rẫy sự nhố nhăng, nơi sự đại bại cũng có thể vạn tuế."
                  </p>
                </div>
              </div>
              <button onClick={() => { setDanhSachDaXem([]); setIdHienTai(null); }} className="mt-8 w-full bg-white text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors">TÁI THIẾT HỒ SƠ <RefreshCw size={18} /></button>
            </div>
          ) : thongTinChon ? (
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-orange-100 h-full flex flex-col animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Trích lục: {thongTinChon.vung}</span>
                  <h2 className="text-3xl font-black italic uppercase leading-none" style={{ color: thongTinChon.mau === '#F8F9FA' ? '#64748b' : thongTinChon.mau }}>{thongTinChon.ten}</h2>
                </div>
                <button onClick={() => setIdHienTai(null)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-300"><X size={24} /></button>
              </div>
              <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-red-500 shadow-inner">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase mb-3">Trích lục bằng chứng (Nổi bật)</h4>
                  <div className="space-y-4">
                    {thongTinChon.danhSachBangChung.map((bc, idx) => (
                      <p key={idx} className="text-slate-800 italic text-sm font-serif leading-relaxed border-b border-slate-200 pb-2 last:border-0">
                        {bc.text.split(new RegExp(`(${bc.highlight.join('|')})`, 'gi')).map((part, i) => 
                          bc.highlight.some(h => h.toLowerCase() === part.toLowerCase()) ? 
                          <span key={i} className="bg-yellow-200 px-1 rounded font-bold not-italic">{part}</span> : part
                        )}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Book size={16} className="text-blue-600" />
                    <h4 className="text-[9px] font-black text-blue-600 uppercase">Hướng dẫn Linearthinking</h4>
                  </div>
                  <p className="text-blue-900 text-xs leading-relaxed font-medium">
                    {thongTinChon.linearGuide}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[8px] bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full font-bold">Đơn giản hóa</span>
                    <span className="text-[8px] bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full font-bold">Kết nối</span>
                    <span className="text-[8px] bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full font-bold">Suy luận</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[9px] font-black text-slate-400 uppercase mb-2">Phân tích hồ sơ</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{thongTinChon.noiDung}</p>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl border-2 border-orange-100">
                  <h4 className="text-[9px] font-black text-orange-600 uppercase mb-2">Kết luận điều tra</h4>
                  <p className="text-xl font-black text-orange-950 leading-tight">"{thongTinChon.ketLuan}"</p>
                </div>
              </div>
              <button onClick={() => { const i = tatCaChungCu.findIndex(x => x.id === idHienTai); xuLyChon(tatCaChungCu[(i + 1) % 7].id); }} className="mt-8 w-full bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2">TIẾP TỤC GIẢI MÃ <ChevronRight size={18} /></button>
            </div>
          ) : (
            <div className="h-full bg-white border-4 border-dashed border-orange-50 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center opacity-50">
              <Search size={40} className="text-orange-300 mb-4" />
              <h3 className="text-lg font-black uppercase mb-2">{laHoanThanh ? 'Điều tra hoàn tất' : 'Chọn tiêu điểm'}</h3>
              <p className="text-[11px] max-w-[200px] leading-relaxed italic">{laHoanThanh ? 'Chân dung Xuân Tóc Đỏ đã hiện nguyên hình đa sắc. Hãy xem Báo cáo tổng kết.' : 'Hãy click vào một mảng màu trên tranh để bắt đầu bóc tách hồ sơ.'}</p>
              {laHoanThanh && (
                <button onClick={() => setIdHienTai(null)} className="mt-6 px-6 py-2 bg-red-600 text-white font-black rounded-full text-[10px] uppercase">Xem báo cáo tổng kết</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Intro Modal */}
      {daMoLopIntro && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 opacity-50" />
            
            <div className="relative z-10">
              {!showQuiz && congCuDaNhan.length === 0 ? (
                <div className="space-y-8 text-center">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="inline-flex p-4 bg-red-600 rounded-3xl text-white shadow-xl shadow-red-200 mb-4"
                  >
                    <ShieldAlert size={48} />
                  </motion.div>
                  <div className="space-y-4">
                    <motion.h2 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl font-black uppercase italic leading-none tracking-tighter"
                    >
                      NHIỆM VỤ:<br/>
                      <span className="text-red-600">ĐIỀU TRA XÃ HỘI HỌC</span>
                    </motion.h2>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-slate-500 font-medium leading-relaxed max-w-md mx-auto"
                    >
                      Chào mừng điều tra viên! Bạn được giao nhiệm vụ bóc tách hồ sơ về <span className="text-slate-900 font-bold">Xuân Tóc Đỏ</span> - kẻ đã làm đảo lộn mọi giá trị xã hội đương thời.
                    </motion.p>
                  </div>
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 text-left"
                  >
                    <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <Target size={14} className="text-red-600" /> QUY TRÌNH CHUẨN BỊ
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm font-bold text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px]">1</div>
                        Vượt qua bài kiểm tra kỹ năng thực chứng.
                      </li>
                      <li className="flex items-start gap-3 text-sm font-bold text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px]">2</div>
                        Thu thập 5 công cụ điều tra chuyên dụng.
                      </li>
                      <li className="flex items-start gap-3 text-sm font-bold text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px]">3</div>
                        Tiến hành giải mã 7 vật chứng tại hiện trường.
                      </li>
                    </ul>
                  </motion.div>

                  <motion.button 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQuiz(true)}
                    className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-3 group"
                  >
                    BẮT ĐẦU HUẤN LUYỆN <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              ) : showQuiz ? (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Huấn luyện điều tra viên</span>
                      <h3 className="text-2xl font-black uppercase italic">Câu hỏi {cauHoiHienTai + 1}/5</h3>
                    </div>
                    <div className="flex gap-1">
                      {cauHoiQuiz.map((_, idx) => (
                        <div key={idx} className={`w-8 h-2 rounded-full transition-all duration-500 ${idx <= cauHoiHienTai ? 'bg-red-600' : 'bg-slate-100'}`} />
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {!phanHoi ? (
                      <motion.div 
                        key="question"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10"><Search size={80} /></div>
                          <p className="text-xl font-bold leading-tight relative z-10">{cauHoiQuiz[cauHoiHienTai].q}</p>
                        </div>

                        <div className="grid gap-3">
                          {cauHoiQuiz[cauHoiHienTai].a.map((ans, idx) => (
                            <button
                              key={idx}
                              onClick={() => xuLyTraLoi(idx)}
                              className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl text-left font-bold text-slate-700 hover:border-red-600 hover:bg-red-50 transition-all flex items-center justify-between group"
                            >
                              <span className="max-w-[90%]">{ans}</span>
                              <ChevronRight size={18} className="text-slate-300 group-hover:text-red-600 shrink-0" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="feedback"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-6"
                      >
                        <div className={`p-8 rounded-[2.5rem] border-4 ${phanHoi.dung ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${phanHoi.dung ? 'bg-green-600' : 'bg-red-600'}`}>
                              {phanHoi.dung ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                            </div>
                            <h4 className={`text-2xl font-black uppercase italic ${phanHoi.dung ? 'text-green-700' : 'text-red-700'}`}>
                              {phanHoi.dung ? 'CHÍNH XÁC!' : 'CHƯA ĐÚNG!'}
                            </h4>
                          </div>
                          <p className="text-slate-700 font-medium leading-relaxed mb-6">
                            {phanHoi.giaiThich}
                          </p>
                          <div className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-white">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
                              {cauHoiQuiz[cauHoiHienTai].icon}
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase">Phần thưởng điều tra</p>
                              <p className="text-sm font-bold text-slate-900">
                                {phanHoi.dung ? `Nhận được: ${cauHoiQuiz[cauHoiHienTai].tool}` : `Vẫn cấp: ${cauHoiQuiz[cauHoiHienTai].tool} (Hãy cẩn thận hơn!)`}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={tiepTucQuiz}
                          className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3"
                        >
                          TIẾP TỤC HUẤN LUYỆN <ChevronRight size={24} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : showStageIntro ? (
                <div className="space-y-8 text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex p-4 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-200 mb-4"
                  >
                    <Book size={48} />
                  </motion.div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black uppercase italic leading-none tracking-tighter">
                      CHẶNG 0:<br/>
                      <span className="text-slate-900">LẬT GIỞ HỒ SƠ ĐIỀU TRA</span>
                    </h2>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
                      Chào mừng điều tra viên chính thức! Bạn sẽ bắt đầu bằng việc <span className="text-slate-900 font-bold underline">lật mở từng mảnh ghép</span> để phác họa chân dung kẻ lưu manh Xuân Tóc Đỏ.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 text-left">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <Target size={14} className="text-red-600" /> MỤC TIÊU CHẶNG 0
                    </h4>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                      "Giải mã đủ 7 vật chứng để nhìn thấu bản chất của 'vĩ nhân' Xuân Tóc Đỏ trước khi tiến vào hiện trường thực tế."
                    </p>
                  </div>

                  <button 
                    onClick={() => setDaMoLopIntro(false)}
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 group"
                  >
                    BẮT ĐẦU GIẢI MÃ <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ) : (
                <div className="space-y-8 text-center">
                  <div className="inline-flex p-4 bg-green-600 rounded-3xl text-white shadow-xl shadow-green-200 mb-4">
                    <CheckCircle size={48} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black uppercase italic">HUẤN LUYỆN HOÀN TẤT!</h2>
                    <p className="text-slate-500 font-medium">Bạn đã sẵn sàng với bộ công cụ điều tra thực chứng.</p>
                  </div>

                  <div className="grid grid-cols-5 gap-3">
                    {congCuDaNhan.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 ${item.correct ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded-2xl flex items-center justify-center shadow-sm`}>
                          {item.icon}
                        </div>
                        <span className="text-[8px] font-black uppercase text-slate-400 text-center leading-tight">{item.tool.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowStageIntro(true)}
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 group"
                  >
                    TIẾP TỤC GIẢI MÃ <Target size={24} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
