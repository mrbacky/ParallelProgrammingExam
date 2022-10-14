using System.Diagnostics;
using ParallelProgramming.Core;

var primes = new Primes();

var st = new Stopwatch();
st.Start();

long from = 1;
long to = 100000;

var a= primes.GetPrimesSequential(from, to);
Console.WriteLine($"Sequential time: {st.Elapsed.TotalSeconds}");
// Console.WriteLine(a.Last());

st.Restart();

var b = primes.GetPrimesParallel(from, to);
Console.WriteLine($"Parallel time: {st.Elapsed.TotalSeconds}");
// Console.WriteLine(b.Last());

st.Stop();

