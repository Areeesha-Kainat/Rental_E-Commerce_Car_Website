
"use client";

import Link from "next/link";
import { useState } from "react";
import { FaLanguage, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Define the type for supported languages
type Language = "en" | "es" | "fr";

// Placeholder translations
const translations: Record<
  Language,
  {
    title: string;
    description: string;
    button: string;
    blogTitle: string;
    blogContent: string;
  }
> = {
  en: {
    title: "Welcome to the Marketplace",
    description: "Browse through a variety of products and services.",
    button: "Explore Now",
    blogTitle: "Why Choose Our Car Rental Service?",
    blogContent:
      "Our car rental service offers flexibility, convenience, and the best cars for your needs. Whether you're going on a business trip or a weekend getaway, we have the perfect car for you. With a wide variety of cars to choose from, you can find the ideal vehicle that fits your style and budget. We also offer customer support and easy booking options for a seamless experience.",
  },
  es: {
    title: "Bienvenido al Mercado",
    description: "Navegue a través de una variedad de productos y servicios.",
    button: "Explorar Ahora",
    blogTitle: "¿Por qué elegir nuestro servicio de alquiler de coches?",
    blogContent:
      "Nuestro servicio de alquiler de coches ofrece flexibilidad, comodidad y los mejores coches para sus necesidades. Ya sea que viaje por negocios o por una escapada de fin de semana, tenemos el coche perfecto para usted. Con una amplia variedad de coches para elegir, puede encontrar el vehículo ideal que se ajuste a su estilo y presupuesto. También ofrecemos soporte al cliente y opciones de reserva fáciles para una experiencia sin problemas.",
  },
  fr: {
    title: "Bienvenue sur le Marché",
    description: "Parcourez une variété de produits et services.",
    button: "Explorer Maintenant",
    blogTitle: "Pourquoi choisir notre service de location de voitures ?",
    blogContent:
      "Notre service de location de voitures offre flexibilité, commodité et les meilleures voitures pour vos besoins. Que vous partiez en voyage d'affaires ou pour une escapade de week-end, nous avons la voiture parfaite pour vous. Avec une large sélection de voitures parmi lesquelles choisir, vous pouvez trouver le véhicule idéal qui correspond à votre style et à votre budget. Nous proposons également un service client et des options de réservation faciles pour une expérience sans tracas.",
  },
};

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Language Switcher */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {(["en", "es", "fr"] as Language[]).map((language) => (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all 
                ${
                  selectedLanguage === language
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-100"
                }`}
              >
                <FaLanguage className="mr-2" />
                {language === "en" && "English"}
                {language === "es" && "Español"}
                {language === "fr" && "Français"}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              {translations[selectedLanguage].title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {translations[selectedLanguage].description}
            </p>
            <Link href="/category">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 mx-auto"
              >
                <span>{translations[selectedLanguage].button}</span>
                <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Blog Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {translations[selectedLanguage].blogTitle}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {translations[selectedLanguage].blogContent}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSelector;
