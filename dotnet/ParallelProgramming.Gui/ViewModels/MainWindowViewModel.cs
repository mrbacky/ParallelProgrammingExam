using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Avalonia.Controls;
using Avalonia.Media;
using DynamicData;
using ParallelProgramming.Core;
using ReactiveUI;

namespace ParallelProgramming.Gui.ViewModels
{
    // comment
    public class MainWindowViewModel : ViewModelBase
    {
        // logic instance
        private readonly Primes _primesLogic;

        public MainWindowViewModel()
        {
            _primesLogic = new Primes();
        }

        private ComboBoxItem _selectedAlgorithm;

        public ComboBoxItem SelectedAlgorithm
        {
            get => _selectedAlgorithm;
            private set
            {
                var res = value;
                this.RaiseAndSetIfChanged(ref _selectedAlgorithm, value);
            }
        }

        private long _fromInputField;

        public long FromInputField
        {
            get => _fromInputField;
            set => this.RaiseAndSetIfChanged(ref _fromInputField, value);
        }

        private long _toInputField;

        public long ToInputField
        {
            get => _toInputField;
            set => this.RaiseAndSetIfChanged(ref _toInputField, value);
        }

        private ObservableCollection<long> _primes = new ObservableCollection<long>();

        public ObservableCollection<long> Primes
        {
            get => _primes;
            set => this.RaiseAndSetIfChanged(ref _primes, value);
        }

        public async Task OnClick_CalculateButton()
        {
            Primes = new ObservableCollection<long>();
            if (_selectedAlgorithm.Content.ToString() == "Sequential")
            {
                var resultSequential = await _primesLogic.GetPrimesSequentialAsync(_fromInputField, _toInputField);
                Primes.AddRange(resultSequential.TakeLast(10000));

            }
            else
            {
                var resultParallel = await _primesLogic.GetPrimesParallelAsync(_fromInputField, _toInputField);
                Primes.AddRange(resultParallel.TakeLast(10000));
            }
        }
    }
}