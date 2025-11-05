import { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

// FAQ Item component with accordion functionality
const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b dark:border-gray-700 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="font-medium">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
          {answer}
        </div>
      </div>
    </div>
  )
}

// FAQ Category component
const FAQCategory = ({ title, faqs }) => {
  const [openIndex, setOpenIndex] = useState(null)
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="card">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            toggleOpen={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // FAQ data organized by categories
  const faqData = [
    {
      category: "Getting Started",
      faqs: [
        {
          question: "How do I create my first page?",
          answer: "To create your first page, navigate to the Pages section in the sidebar. Click on the '+ New Page' button at the top of the page tree. This will create a blank page that you can start editing right away. You can add a title and content to your page using the rich text editor."
        },
        {
          question: "Can I organize my pages in folders?",
          answer: "Yes! Our system uses a nested page structure instead of traditional folders. You can create a parent page and then add sub-pages underneath it. To create a sub-page, hover over a page in the page tree and click the '+' icon that appears. This creates a hierarchical structure similar to folders but more flexible."
        },
        {
          question: "How do I navigate between pages?",
          answer: "You can navigate between pages using the sidebar navigation. The sidebar displays all your pages in a tree structure. Click on any page to open it. You can also use the breadcrumb navigation at the top of each page to move up the hierarchy or return to parent pages."
        }
      ]
    },
    {
      category: "Pages & Content",
      faqs: [
        {
          question: "How do I format text in my pages?",
          answer: "Our rich text editor supports various formatting options. Select the text you want to format and use the formatting toolbar that appears. You can make text bold, italic, create headings, add bullet points or numbered lists, insert links, and more. You can also use keyboard shortcuts like Ctrl+B for bold and Ctrl+I for italic."
        },
        {
          question: "Can I add images to my pages?",
          answer: "Yes, you can add images to your pages. While editing a page, click on the '+' button in the editor and select 'Image'. You can then upload an image from your computer or paste an image URL. Once uploaded, you can resize the image by dragging its corners."
        },
        {
          question: "How do I create a table?",
          answer: "To create a table, click on the '+' button in the editor and select 'Table'. You can specify the number of rows and columns for your table. Once created, you can add content to each cell, and use the table toolbar to add or remove rows and columns as needed."
        }
      ]
    },
    {
      category: "Templates",
      faqs: [
        {
          question: "How do I use a template?",
          answer: "To use a template, go to the Templates page from the sidebar. Browse through the available templates and click on the one you want to use. You'll see a preview of the template. Click the 'Use Template' button to create a new page based on that template. The new page will be pre-filled with the template's content, which you can then customize."
        },
        {
          question: "Can I create my own templates?",
          answer: "Yes, you can create your own templates. First, create a page with the content and structure you want to reuse. Then, go to the Templates page and click 'Create Template'. Select the page you want to use as a template, give it a name and description, and click 'Save'. Your template will now be available for future use."
        },
        {
          question: "How do I edit or delete a template?",
          answer: "To edit a template, go to the Templates page, find the template you want to modify, and click the 'Edit' button. Make your changes and save. To delete a template, click the 'Delete' button on the template card. Note that deleting a template doesn't affect pages that were already created using that template."
        }
      ]
    },
    {
      category: "Files & Uploads",
      faqs: [
        {
          question: "What file types can I upload?",
          answer: "You can upload various file types including documents (PDF, DOCX, TXT), spreadsheets (XLSX, CSV), presentations (PPTX), images (JPG, PNG, GIF), and more. The maximum file size is 50MB per file."
        },
        {
          question: "How does the file summarizer work?",
          answer: "The file summarizer uses AI to generate concise summaries of your uploaded documents. After uploading a file (particularly PDFs or text documents), click the 'Summarize' button next to the file. Our system will analyze the content and generate a summary highlighting the key points. This is especially useful for quickly understanding long documents without reading them entirely."
        },
        {
          question: "Can I organize my files in folders?",
          answer: "Currently, all files are stored in a flat structure in the Files page. However, you can use the search and filter options to quickly find specific files. We're working on adding folder organization in a future update."
        }
      ]
    },
    {
      category: "AI Workspace",
      faqs: [
        {
          question: "What can I do in the AI Workspace?",
          answer: "The AI Workspace offers several AI-powered tools to enhance your productivity. You can chat with an AI assistant to get answers to questions, generate summaries of text, create study notes on specific topics, and more. These tools use advanced AI models to help you work more efficiently."
        },
        {
          question: "Is there a limit to how much I can use the AI features?",
          answer: "Free accounts have a monthly quota for AI features. Premium accounts have higher limits or unlimited access depending on your subscription plan. You can view your current usage and limits in the Settings page."
        },
        {
          question: "How accurate are the AI-generated summaries and notes?",
          answer: "Our AI models are designed to provide high-quality summaries and notes, but they may occasionally contain inaccuracies or miss important details. We recommend using AI-generated content as a starting point and reviewing it for accuracy, especially for critical information."
        }
      ]
    }
  ]
  
  // Filter FAQs based on search query
  const filteredFAQData = searchQuery
    ? faqData.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : faqData
  
  return (
    <div className="h-[calc(100vh-12rem)] overflow-auto pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500">Find answers to common questions about using our platform</p>
      </div>
      
      <div className="relative mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FAQs..."
          className="input pl-10 w-full max-w-md"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      
      {filteredFAQData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No FAQs found matching your search. Try different keywords.</p>
        </div>
      ) : (
        filteredFAQData.map((category, index) => (
          <FAQCategory
            key={index}
            title={category.category}
            faqs={category.faqs}
          />
        ))
      )}
    </div>
  )
}