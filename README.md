# 🔄 Sorting Algorithm Visualizer

A beautiful and interactive React application that visualizes popular sorting algorithms in real-time. Watch how different algorithms sort arrays with stunning animations and customizable settings!

## ✨ Features

- 🎯 **Multiple Sorting Algorithms**: Merge Sort, Quick Sort, Heap Sort, and Bubble Sort
- 🎨 **Beautiful Animations**: Smooth, colorful visualizations with gradient bars
- ⚡ **Customizable Settings**: Adjust array size (20-150 elements) and animation speed
- 📱 **Responsive Design**: Works great on desktop and mobile devices
- 🛑 **Interactive Controls**: Start, stop, and generate new arrays with ease
- 🧪 **Algorithm Testing**: Built-in test suite to verify sorting correctness
- 🌙 **Modern Dark Theme**: Sleek glassmorphism design with gradient backgrounds

## 🛠️ Technologies Used

- **React** ⚛️ - Frontend framework
- **Vite** ⚡ - Fast build tool and dev server
- **CSS3** 🎨 - Custom animations and styling
- **JavaScript** 📜 - Algorithm implementations
- **HTML5** 🏗️ - Structure and semantics

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher) 📦
- npm or yarn 🧶

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sorting-visualizer.git
   cd sorting-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

## 🎮 How to Use

1. **Generate Array**: Click "Generate New Array" to create a random array
2. **Choose Algorithm**: Select from Merge Sort, Quick Sort, Heap Sort, or Bubble Sort
3. **Adjust Settings**: Use sliders to change array size and animation speed
4. **Start Sorting**: Click "Sort!" to begin the visualization
5. **Stop Anytime**: Use the "Stop" button to halt the animation
6. **Test Algorithms**: Verify correctness with the built-in test suite

## 📊 Supported Algorithms

| Algorithm | Time Complexity | Space Complexity | Stability |
|-----------|----------------|------------------|-----------|
| **Merge Sort** | O(n log n) | O(n) | ✅ Stable |
| **Quick Sort** | O(n log n) avg, O(n²) worst | O(log n) | ❌ Unstable |
| **Heap Sort** | O(n log n) | O(1) | ❌ Unstable |
| **Bubble Sort** | O(n²) | O(1) | ✅ Stable |

## 🏗️ Project Structure

```
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── public/
│   └── sorting.png
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── index.css
│   ├── main.jsx
│   ├── SortingAlgorithms/
│   │   └── sortingAlgorithms.jsx
│   └── SortingVisualizer/
│       ├── SortingVisualizer.css
│       └── SortingVisualizer.jsx
└── vite.config.js
```

## 🎨 Customization

### Themes
The app uses CSS custom properties for easy theming:
```css
:root {
  --bg-1: #101828;
  --bg-2: #1f2a37;
  --accent: #EA763F;
  --primary-bar: linear-gradient(180deg, #36d1dc, #5b86e5);
}
```

### Adding New Algorithms
1. Implement the algorithm in `src/SortingAlgorithms/sortingAlgorithms.jsx`
2. Create animation function following the existing pattern
3. Add the algorithm to the button list in `src/SortingVisualizer/SortingVisualizer.jsx`

## 🤝 Contributing

Contributions are **always welcome**! Here's how you can help:

### 🌟 Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? Open an issue!
- 💡 **Feature Requests**: Have an idea? We'd love to hear it!
- 🔧 **Code Contributions**: Submit a pull request
- 📖 **Documentation**: Help improve our docs
- 🎨 **Design**: Suggest UI/UX improvements

### 📝 Contribution Guidelines

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### 🚀 Ideas for Contributions

- [ ] Add more sorting algorithms (Selection Sort, Insertion Sort, Radix Sort)
- [ ] Implement sound effects for visualizations
- [ ] Add algorithm complexity information display
- [ ] Create comparison mode for multiple algorithms
- [ ] Add export functionality for animations
- [ ] Implement custom array input
- [ ] Add step-by-step mode
- [ ] Create algorithm explanations and tutorials

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- 📱 Mobile browsers

## 🔧 Performance Notes

- Optimized for arrays up to 150 elements
- Uses `requestAnimationFrame` for smooth animations
- Implements proper cleanup to prevent memory leaks
- Responsive design adapts to different screen sizes

---

### 🌟 Star this repository if you found it helpful!
