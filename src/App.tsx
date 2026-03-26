/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeEvent, FocusEvent, FormEvent, MouseEvent } from "react";
import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  Share2,
  Check,
  ArrowUp,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Folder,
  Presentation,
  BookOpen,
  LineChart,
  AlertCircle,
  Lightbulb,
  Code,
  FileCode,
  Code2,
  Atom,
  Layers,
  Palette,
  Brain,
  PenTool,
  Link,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
  {
    title: "PresentasiPro & Digital Assets",
    description:
      "Platform e-commerce untuk produk digital template PowerPoint dan layanan desain presentasi profesional.",
    extendedDescription:
      "Website e-commerce komprehensif yang menyediakan berbagai template PowerPoint premium dan layanan desain presentasi kustom. Dilengkapi dengan sistem keranjang belanja, integrasi gateway pembayaran, dan dashboard pengguna untuk mengelola unduhan dan pesanan layanan desain.",
    tags: ["E-Commerce", "React", "Tailwind CSS", "UI/UX"],
    icon: Presentation,
    link: "https://presentasipro.example.com",
  },
  {
    title: "DailyStory.co",
    description:
      "Aplikasi produktivitas all-in-one dengan fitur buku harian, manajemen tugas, dan penjadwalan.",
    extendedDescription:
      "Aplikasi pencatatan modern yang menggabungkan fitur buku harian (diary), to-do list, dan penjadwalan dalam satu antarmuka yang mulus. Menawarkan fitur-fitur menarik seperti sinkronisasi cloud, mode fokus, pengingat cerdas, dan kustomisasi tema untuk meningkatkan produktivitas harian.",
    tags: ["Productivity", "Next.js", "TypeScript", "State Management"],
    icon: BookOpen,
    link: "https://hosemangunsong.github.io/dailystory/",
  },
  {
    title: "FinSim: Simulator Keuangan",
    description:
      "Platform simulasi interaktif untuk perencanaan keuangan, investasi, dan manajemen aset.",
    extendedDescription:
      "Aplikasi web interaktif yang memungkinkan pengguna untuk mensimulasikan berbagai skenario keuangan. Termasuk kalkulator investasi, simulasi KPR, proyeksi dana pensiun, dan analisis pengeluaran dengan visualisasi grafik yang interaktif untuk membantu pengambilan keputusan finansial yang lebih baik.",
    tags: ["Finance", "Data Visualization", "Vue.js", "Chart.js"],
    icon: LineChart,
    link: "https://finsim.example.com",
  },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isCopied, setIsCopied] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Update year automatically if the page is left open during New Year
  useEffect(() => {
    const interval = setInterval(() => {
      const year = new Date().getFullYear();
      if (year !== currentYear) {
        setCurrentYear(year);
      }
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentYear]);

  // Handle scroll event for Back to Top button
  useEffect(() => {
    if (!selectedProject) {
      setIsShareMenuOpen(false);
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getNameErrorMessage = () => {
    if (formData.name.trim().length === 0)
      return "Nama lengkap tidak boleh kosong.";
    if (formData.name.trim().length < 3)
      return "Nama harus terdiri dari minimal 3 karakter.";
    return "";
  };

  const getEmailErrorMessage = () => {
    if (formData.email.trim().length === 0)
      return "Alamat email tidak boleh kosong.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Format email tidak valid (contoh: nama@email.com).";
    return "";
  };

  const getSubjectErrorMessage = () => {
    if (formData.subject.trim().length === 0)
      return "Subjek pesan tidak boleh kosong.";
    if (formData.subject.trim().length < 5)
      return "Subjek terlalu singkat (minimal 5 karakter).";
    return "";
  };

  const getMessageErrorMessage = () => {
    if (formData.message.trim().length === 0)
      return "Pesan tidak boleh kosong.";
    if (formData.message.trim().length < 10)
      return "Pesan terlalu singkat (minimal 10 karakter).";
    return "";
  };

  const nameError = getNameErrorMessage();
  const emailError = getEmailErrorMessage();
  const subjectError = getSubjectErrorMessage();
  const messageError = getMessageErrorMessage();

  const isNameValid = nameError === "";
  const isEmailValid = emailError === "";
  const isSubjectValid = subjectError === "";
  const isMessageValid = messageError === "";
  const isFormValid =
    isNameValid && isEmailValid && isSubjectValid && isMessageValid;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleInputBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSubmitted(true);
    } else {
      setTouched({ name: true, email: true, subject: true, message: true });
    }
  };

  const scrollToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    if (sectionId === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 64; // h-16 = 4rem = 64px
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const filteredProjects = selectedTag
    ? projects.filter((p) => p.tags.includes(selectedTag))
    : projects;

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#2C2C2C] dark:bg-[#1A1C19] dark:text-[#E2E2D5] transition-colors duration-300 font-sans selection:bg-[#D97757]/30">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#F5F2EB]/70 dark:bg-[#1A1C19]/70 border-b border-[#E0DCD0] dark:border-[#2F332D] transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => scrollToSection(e, "")}
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            Hose.
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#beranda"
              onClick={(e) => scrollToSection(e, "beranda")}
              className="text-sm font-medium hover:text-[#D97757] dark:hover:text-[#E6A165] transition-colors"
            >
              Beranda
            </a>
            <a
              href="#tentang"
              onClick={(e) => scrollToSection(e, "tentang")}
              className="text-sm font-medium hover:text-[#D97757] dark:hover:text-[#E6A165] transition-colors"
            >
              Tentang
            </a>
            <a
              href="#proyek"
              onClick={(e) => scrollToSection(e, "proyek")}
              className="text-sm font-medium hover:text-[#D97757] dark:hover:text-[#E6A165] transition-colors"
            >
              Proyek
            </a>
            <a
              href="#kontak"
              onClick={(e) => scrollToSection(e, "kontak")}
              className="text-sm font-medium hover:text-[#D97757] dark:hover:text-[#E6A165] transition-colors"
            >
              Kontak
            </a>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[#D1CDBF] dark:hover:bg-[#3A3E38] transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[#D1CDBF] dark:hover:bg-[#3A3E38] transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-[#D1CDBF] dark:hover:bg-[#3A3E38] transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#E0DCD0] dark:border-[#2F332D] bg-[#F5F2EB]/90 dark:bg-[#1A1C19]/90 backdrop-blur-md px-6 py-4 space-y-4 font-medium text-sm overflow-hidden"
            >
              <a
                href="#beranda"
                onClick={(e) => scrollToSection(e, "beranda")}
                className="block hover:text-[#D97757] dark:hover:text-[#E6A165] transition-colors"
              >
                Beranda
              </a>
              <a
                href="#tentang"
                onClick={(e) => scrollToSection(e, "tentang")}
                className="block hover:text-[#D97757] dark:hover:text-[#E6A165] transition-colors"
              >
                Tentang
              </a>
              <a
                href="#proyek"
                onClick={(e) => scrollToSection(e, "proyek")}
                className="block hover:text-[#D97757] dark:hover:text-[#E6A165] transition-colors"
              >
                Proyek
              </a>
              <a
                href="#kontak"
                onClick={(e) => scrollToSection(e, "kontak")}
                className="block hover:text-[#D97757] dark:hover:text-[#E6A165] transition-colors"
              >
                Kontak
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-24 w-full transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
        {/* Hero Section */}
        <section
          id="beranda"
          className="py-12 md:py-20 flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              Halo, saya seorang <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#D97757] to-[#E8A87C] dark:from-[#E6A165] dark:to-[#C27654]">
                Programmer Front End
              </span>{" "}
            </h1>
            <p className="text-lg md:text-xl text-[#5C5C5C] dark:text-[#B5B5A6] max-w-2xl mb-10 leading-relaxed">
              Berfokus pada pengembangan web dan software untuk menciptakan
              solusi digital yang inovatif, fungsional, dan estetis.
            </p>
            <a
              href="#proyek"
              onClick={(e) => scrollToSection(e, "proyek")}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#2C2C2C] dark:bg-[#EAE6D7] dark:text-[#2C2C2C] rounded-full hover:bg-[#3A3E38] dark:hover:bg-[#E0DCD0] transition-colors group"
            >
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#D97757]/100 dark:after:bg-[#D97757] group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out">
                Lihat Proyek Saya
              </span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          id="tentang"
          className="py-16 md:py-24 border-t border-[#E0DCD0] dark:border-[#2F332D] transition-colors duration-300"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Tentang Saya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="prose prose-zinc dark:prose-invert">
                <p className="text-lg text-[#5C5C5C] dark:text-[#B5B5A6] leading-relaxed">
                  Saya adalah seorang pengembang perangkat lunak yang antusias
                  dengan pengalaman dalam membangun aplikasi web modern. Saya
                  memiliki minat besar pada kecerdasan buatan (AI) dan desain
                  antarmuka pengguna (UI/UX).
                </p>
                <p className="text-lg text-[#5C5C5C] dark:text-[#B5B5A6] leading-relaxed mt-4">
                  Tujuan saya adalah menciptakan solusi digital yang tidak hanya
                  berfungsi dengan baik, tetapi juga memberikan pengalaman
                  pengguna yang intuitif dan menyenangkan.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Keahlian</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "JavaScript", icon: FileCode },
                    { name: "TypeScript", icon: Code2 },
                    { name: "React", icon: Atom },
                    { name: "Next.js", icon: Layers },
                    { name: "Tailwind CSS", icon: Palette },
                    { name: "AI/ML", icon: Brain },
                    { name: "UI/UX Design", icon: PenTool },
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-[#E0DCD0] dark:bg-[#2F332D]/50 text-[#4A4A4A] dark:text-[#B5B5A6] rounded-md border border-[#E0DCD0] dark:border-[#3A3E38]/50"
                    >
                      <skill.icon className="w-4 h-4 text-[#D97757] dark:text-[#E6A165]" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section
          id="proyek"
          className="py-16 md:py-24 border-t border-[#E0DCD0] dark:border-[#2F332D] transition-colors duration-300"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Proyek Pilihan
              </h2>

              {/* Filter Bar */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedTag === null
                      ? "bg-[#2C2C2C] text-white dark:bg-[#EAE6D7] dark:text-[#2C2C2C] shadow-md"
                      : "bg-[#E0DCD0] text-[#5C5C5C] hover:bg-[#D1CDBF] dark:bg-[#2F332D]/50 dark:text-[#9A9A8A] dark:hover:bg-[#3A3E38]"
                  }`}
                >
                  Semua
                </button>
                {allTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      selectedTag === tag
                        ? "bg-[#2C2C2C] text-white dark:bg-[#EAE6D7] dark:text-[#2C2C2C] shadow-md"
                        : "bg-[#E0DCD0] text-[#5C5C5C] hover:bg-[#D1CDBF] dark:bg-[#2F332D]/50 dark:text-[#9A9A8A] dark:hover:bg-[#3A3E38]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className="group flex flex-col bg-[#EAE6D7] dark:bg-[#2C2C2C] border border-[#E0DCD0] dark:border-[#2F332D] rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer"
                >
                  <div className="h-48 w-full bg-gradient-to-br from-[#E0DCD0] to-[#F5F2EB] dark:from-[#3A3E38] dark:to-[#2F332D] relative p-6 flex items-end">
                    <div className="absolute top-6 right-6 p-3 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-500">
                      <project.icon className="w-8 h-8 text-[#D97757] dark:text-[#E6A165]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C2C2C] dark:text-[#E2E2D5] leading-tight group-hover:text-[#D97757] dark:group-hover:text-[#E6A165] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-[#EAE6D7] dark:bg-[#2C2C2C]">
                    <p className="text-[#5C5C5C] dark:text-[#B5B5A6] mb-6 flex-grow leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <button
                          key={tagIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTag(tag);
                            document
                              .getElementById("proyek")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-300 ${
                            selectedTag === tag
                              ? "bg-[#D97757] text-white shadow-sm"
                              : "bg-[#D97757]/10 dark:bg-[#E6A165]/10 text-[#D97757] dark:text-[#F5B074] border border-[#D97757]/20 dark:border-[#E6A165]/20 hover:bg-[#D97757]/30 dark:hover:bg-[#E6A165]/40 hover:border-[#D97757]/40 dark:hover:border-[#E6A165]/50"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E0DCD0] dark:border-[#3A3E38]">
                      <span className="text-sm font-semibold text-[#D97757] dark:text-[#E6A165] uppercase tracking-wider">
                        Eksplorasi
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#D97757]/10 dark:bg-[#E6A165]/10 flex items-center justify-center group-hover:bg-[#D97757] group-hover:text-white dark:group-hover:bg-[#E6A165] dark:group-hover:text-[#1A1C19] transition-colors text-[#D97757] dark:text-[#E6A165]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section
          id="kontak"
          className="py-20 md:py-32 border-t border-[#E0DCD0] dark:border-[#2F332D] transition-colors duration-300"
        >
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-[#2C2C2C] dark:text-[#E2E2D5]">
                Mari Berkolaborasi
              </h2>
              <p className="text-lg text-[#5C5C5C] dark:text-[#B5B5A6] max-w-2xl leading-relaxed">
                Tertarik untuk bekerja sama, mendiskusikan ide, atau sekadar
                ingin menyapa? Jangan ragu untuk menghubungi saya melalui
                formulir di bawah atau kontak langsung.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
              {/* Left Column: Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2 space-y-10"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-[#2C2C2C] dark:text-[#E2E2D5]">
                    Informasi Kontak
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#D97757]/10 dark:bg-[#E6A165]/10 text-[#D97757] dark:text-[#E6A165] rounded-xl">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#7A7A7A] dark:text-[#9A9A8A] mb-1">
                          Email
                        </p>
                        <a
                          href="mailto:hello@example.com"
                          className="text-base font-medium text-[#2C2C2C] dark:text-[#E2E2D5] hover:text-[#D97757] dark:hover:text-[#E6A165] transition-colors"
                        >
                          hosemangunsong@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#D97757]/10 dark:bg-[#E6A165]/10 text-[#D97757] dark:text-[#E6A165] rounded-xl">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#7A7A7A] dark:text-[#9A9A8A] mb-1">
                          Lokasi
                        </p>
                        <p className="text-base font-medium text-[#2C2C2C] dark:text-[#E2E2D5]">
                          Medan, Indonesia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6 text-[#2C2C2C] dark:text-[#E2E2D5]">
                    Sosial Media
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="p-3 bg-[#EAE6D7] dark:bg-[#2C2C2C] border border-[#E0DCD0] dark:border-[#2F332D] text-[#5C5C5C] dark:text-[#B5B5A6] hover:bg-[#D97757] hover:text-white dark:hover:bg-[#D97757]/100 dark:hover:text-white hover:border-transparent rounded-xl transition-all shadow-sm hover:shadow-md"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-[#EAE6D7] dark:bg-[#2C2C2C] border border-[#E0DCD0] dark:border-[#2F332D] text-[#5C5C5C] dark:text-[#B5B5A6] hover:bg-[#D97757] hover:text-white dark:hover:bg-[#D97757]/100 dark:hover:text-white hover:border-transparent rounded-xl transition-all shadow-sm hover:shadow-md"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-3"
              >
                <div className="w-full bg-[#EAE6D7] dark:bg-[#2C2C2C] p-8 rounded-2xl shadow-xl border border-[#E0DCD0] dark:border-[#2F332D]">
                  <h3 className="text-2xl font-semibold mb-6 text-[#2C2C2C] dark:text-[#E2E2D5]">
                    Kirim Pesan
                  </h3>
                  <form
                    className="flex flex-col gap-5 text-left"
                    onSubmit={handleContactSubmit}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[#4A4A4A] dark:text-[#B5B5A6] mb-1.5"
                        >
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          placeholder=""
                          className={`w-full px-4 py-3 rounded-xl border bg-[#F5F2EB] dark:bg-[#1A1C19] text-[#2C2C2C] dark:text-[#E2E2D5] focus:ring-2 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            touched.name && !isNameValid
                              ? "border-red-500 dark:border-red-500/50 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20"
                              : "border-[#D1CDBF] dark:border-[#3A3E38] focus:border-[#D97757] focus:ring-[#D97757]/20"
                          }`}
                          required
                          disabled={isSubmitted}
                        />
                        {touched.name && !isNameValid && (
                          <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
                            {nameError}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[#4A4A4A] dark:text-[#B5B5A6] mb-1.5"
                        >
                          Alamat Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          placeholder=""
                          className={`w-full px-4 py-3 rounded-xl border bg-[#F5F2EB] dark:bg-[#1A1C19] text-[#2C2C2C] dark:text-[#E2E2D5] focus:ring-2 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            touched.email && !isEmailValid
                              ? "border-red-500 dark:border-red-500/50 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20"
                              : "border-[#D1CDBF] dark:border-[#3A3E38] focus:border-[#D97757] focus:ring-[#D97757]/20"
                          }`}
                          required
                          disabled={isSubmitted}
                        />
                        {touched.email && !isEmailValid && (
                          <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
                            {emailError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-[#4A4A4A] dark:text-[#B5B5A6] mb-1.5"
                      >
                        Subjek
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder="Apa yang ingin Anda diskusikan?"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#F5F2EB] dark:bg-[#1A1C19] text-[#2C2C2C] dark:text-[#E2E2D5] focus:ring-2 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          touched.subject && !isSubjectValid
                            ? "border-red-500 dark:border-red-500/50 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20"
                            : "border-[#D1CDBF] dark:border-[#3A3E38] focus:border-[#D97757] focus:ring-[#D97757]/20"
                        }`}
                        required
                        disabled={isSubmitted}
                      />
                      {touched.subject && !isSubjectValid && (
                        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
                          {subjectError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[#4A4A4A] dark:text-[#B5B5A6] mb-1.5"
                      >
                        Pesan
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        rows={5}
                        placeholder="Tulis pesan Anda di sini secara detail..."
                        className={`w-full px-4 py-3 rounded-xl border bg-[#F5F2EB] dark:bg-[#1A1C19] text-[#2C2C2C] dark:text-[#E2E2D5] focus:ring-2 outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                          touched.message && !isMessageValid
                            ? "border-red-500 dark:border-red-500/50 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20"
                            : "border-[#D1CDBF] dark:border-[#3A3E38] focus:border-[#D97757] focus:ring-[#D97757]/20"
                        }`}
                        required
                        disabled={isSubmitted}
                      ></textarea>
                      {touched.message && !isMessageValid && (
                        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
                          {messageError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitted || !isFormValid}
                      className={`mt-2 w-full sm:w-auto sm:self-end inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white rounded-xl transition-all group shadow-md ${
                        isSubmitted || !isFormValid
                          ? "bg-[#9A9A8A] dark:bg-[#3A3E38] cursor-not-allowed opacity-70"
                          : "bg-[#D97757] hover:bg-[#C86646] focus:ring-4 focus:ring-[#D97757]/50 hover:shadow-lg"
                      }`}
                    >
                      {isSubmitted ? "Pesan Terkirim" : "Kirim Pesan"}
                      {!isSubmitted && (
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          className="mt-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-3"
                        >
                          <div className="p-1 bg-emerald-100 dark:bg-emerald-500/20 rounded-full">
                            <Check className="w-4 h-4" />
                          </div>
                          Terima kasih! Pesan Anda telah berhasil dikirim. Saya
                          akan segera membalasnya.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E0DCD0] dark:border-[#2F332D] bg-[#F5F2EB] dark:bg-[#1A1C19] transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A8A]">
            &copy; {currentYear} Hose. All rights reserved.
          </p>
          <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A8A] mt-2 md:mt-0">
            Dibuat dengan React & Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#2C2C2C]/60 backdrop-blur-sm"
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 30,
                    stiffness: 250,
                    mass: 0.8,
                    staggerChildren: 0.07,
                    delayChildren: 0.05,
                  },
                },
                exit: {
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                  transition: {
                    duration: 0.3,
                    ease: [0.2, 0.8, 0.2, 1],
                  },
                },
              }}
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#EAE6D7] dark:bg-[#2C2C2C] border border-[#E0DCD0] dark:border-[#2F332D] rounded-2xl shadow-2xl overflow-hidden"
            >
              <motion.button
                variants={{
                  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: { type: "spring", damping: 25, stiffness: 300 },
                  },
                }}
                onClick={() => setSelectedProject(null)}
                className="group absolute top-4 right-4 z-10 p-2 text-[#7A7A7A] hover:text-[#2C2C2C] dark:text-[#B5B5A6] dark:hover:text-[#E2E2D5] bg-[#E0DCD0] hover:bg-red-100 dark:bg-[#2F332D] dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 rounded-full transition-all duration-300"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#2C2C2C] dark:bg-[#E0DCD0] text-white dark:text-[#2C2C2C] text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-sm translate-y-1 group-hover:translate-y-0">
                  Tutup
                </span>
              </motion.button>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
                    },
                  }}
                  className="flex items-center gap-4 mb-4 pr-12"
                >
                  <div className="p-3 bg-[#D97757]/10 dark:bg-[#E6A165]/10 rounded-2xl shrink-0">
                    <selectedProject.icon className="w-8 h-8 text-[#D97757] dark:text-[#E6A165]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] dark:text-[#E2E2D5]">
                    {selectedProject.title}
                  </h3>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
                    },
                  }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {selectedProject.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-1 text-xs font-medium bg-[#D97757]/10 dark:bg-[#E6A165]/10 text-[#D97757] dark:text-[#F5B074] border border-[#D97757]/20 dark:border-[#E6A165]/20 rounded-md transition-all duration-300 hover:bg-[#D97757]/20 dark:hover:bg-[#E6A165]/20 hover:border-[#D97757]/30 dark:hover:border-[#E6A165]/40 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
                    },
                  }}
                  className="prose prose-zinc dark:prose-invert max-w-none"
                >
                  <p className="text-[#5C5C5C] dark:text-[#B5B5A6] text-base sm:text-lg leading-relaxed mb-6">
                    {selectedProject.extendedDescription ||
                      selectedProject.description}
                  </p>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
                    },
                  }}
                  className="mt-8 pt-6 border-t border-[#E0DCD0] dark:border-[#2F332D] flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <a
                      href={selectedProject.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-br from-[#D97757] to-[#E8A87C] dark:from-[#E6A165] dark:to-[#C27654] rounded-full hover:from-[#C86646] hover:to-[#D7976B] dark:hover:from-[#F5B074] dark:hover:to-[#D18563] transition-all shadow-md shadow-[#D97757]/20 hover:shadow-lg hover:shadow-[#D97757]/40 hover:-translate-y-0.5"
                    >
                      Kunjungi Proyek <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#7A7A7A] dark:text-[#9A9A8A] w-full sm:w-auto justify-center sm:justify-end relative">
                    <span className="font-medium">Bagikan:</span>

                    <div className="relative">
                      <button
                        onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0DCD0] dark:bg-[#2F332D]/50 hover:bg-[#D1CDBF] dark:hover:bg-[#3A3E38] transition-colors text-[#2C2C2C] dark:text-[#E2E2D5] font-medium"
                        aria-label="Share"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Bagikan</span>
                      </button>

                      <AnimatePresence>
                        {isShareMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-[#2C2C2C] rounded-xl shadow-xl border border-[#E0DCD0] dark:border-[#3A3E38] overflow-hidden z-50"
                          >
                            <div className="flex flex-col">
                              <button
                                onClick={() => {
                                  const projectUrl =
                                    (selectedProject as any).link ||
                                    window.location.href;
                                  window.open(
                                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`,
                                    "_blank",
                                  );
                                  setIsShareMenuOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F5] dark:hover:bg-[#3A3E38] transition-colors text-left text-[#2C2C2C] dark:text-[#E2E2D5]"
                              >
                                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                                <span>LinkedIn</span>
                              </button>
                              <button
                                onClick={() => {
                                  const projectUrl =
                                    (selectedProject as any).link ||
                                    window.location.href;
                                  window.location.href = `mailto:?subject=${encodeURIComponent(selectedProject.title)}&body=${encodeURIComponent("Check out this project: " + projectUrl)}`;
                                  setIsShareMenuOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F5] dark:hover:bg-[#3A3E38] transition-colors text-left text-[#2C2C2C] dark:text-[#E2E2D5]"
                              >
                                <Mail className="w-4 h-4 text-[#D97757] dark:text-[#E6A165]" />
                                <span>Email</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      onClick={() => {
                        const projectUrl =
                          (selectedProject as any).link || window.location.href;
                        navigator.clipboard.writeText(projectUrl);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className="relative p-2.5 rounded-full bg-[#E0DCD0] dark:bg-[#2F332D]/50 hover:bg-[#D1CDBF] dark:hover:bg-[#3A3E38] transition-colors"
                      aria-label="Copy Link"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Link className="w-4 h-4" />
                      )}
                      <AnimatePresence>
                        {isCopied && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#2C2C2C] dark:bg-[#E0DCD0] text-white dark:text-[#2C2C2C] text-xs font-medium rounded-md shadow-md whitespace-nowrap pointer-events-none"
                          >
                            Tersalin!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 p-3 bg-[#D97757] hover:bg-[#C86646] text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40 group"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
